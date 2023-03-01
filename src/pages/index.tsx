import {Alert, Box, Button, Grid, Snackbar, TextField, Typography} from '@mui/material';
import Image from 'next/image';
import * as yup from 'yup';
import {useFormik} from "formik";
import {HomeFormType} from "@/types/forms/homeForm.type";
import {useDispatch} from "react-redux";
import {setUsername} from "@/store/slices/chatSlice";
import {useRouter} from "next/router";
import {AppRoute} from "@/constants/appRoute";
import {useEffect, useState} from "react";
import {useSocket} from "@/hooks/useSocket";
import {SocketEventEnum} from "@/constants/socketEvent.enum";
import {joinUser} from "@/services/socket.service";
import {NotificationMessageEnum} from "@/constants/notificationMessage.enum";

export default function Home() {
    const [usernameForm, setUsernameForm] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const {socket} = useSocket();
    const [openAlert, setOpenAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [alertKey, setAlertKey] = useState(0);


    const validationSchema = yup.object().shape({
        username: yup.string().matches(/^\S*$/, 'No spaces allowed').required('Username is required')
    });

    const initialValues: HomeFormType = {
        username: '',
    }

    const handleSubmit = async (values: HomeFormType) => {
        if (!socket) return;

        setUsernameForm(values.username);
        joinUser(socket, values.username);
        formik.resetForm();
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    })

    const showAlert = (msg: string) => {
        setMsgAlert(msg);
        setOpenAlert(true);
        setAlertKey((prevKey) => prevKey + 1);
    };

    const handleClose = () => {
        setOpenAlert(false);
    };

    useEffect(() => {
        if (!socket) return;

        socket.on(SocketEventEnum.notifications, async (notification) => {
            const parsedNotification = JSON.parse(notification);

            switch (parsedNotification.msg) {
                case NotificationMessageEnum.authenticationSuccessful:
                    dispatch(setUsername({username: usernameForm}));
                    await router.push(`${AppRoute.chat}?roomId=general`);
                    break;
                case NotificationMessageEnum.usernameIsAlreadyTaken:
                    showAlert('Username is already taken');
                    console.log(msgAlert);
                    break;
            }
        });
    }, [dispatch, router, socket, usernameForm]);

    return (
        <Grid container width='100%' height='100vh'>
            <Grid container xs={12} md={5} justifyContent='center' item>
                <Box display='flex' flexDirection='column' gap={5} sx={{marginTop: '45%'}}>
                    <Typography variant='h1' fontSize='xx-large'>Welcome to chat message</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Box display='flex' flexDirection={'column'} justifyContent='space-between' gap={2}>
                            <TextField name='username'
                                       label='Insert your username'
                                       value={formik.values.username}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.username && Boolean(formik.errors.username)}
                                       helperText={formik.touched.username && formik.errors.username}
                                       autoComplete='off'
                                       fullWidth/>
                            <Button color='primary' variant='contained' type='submit' fullWidth>
                                Enter
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
            <Grid container xs={12} md={7} justifyContent='center' alignItems='center' item>
                <Image src='./chat-message-app.svg' alt='chat-message-app' width={600} height={400} draggable='false'/>
            </Grid>
            <Snackbar key={alertKey} open={openAlert} autoHideDuration={3000}
                      anchorOrigin={{vertical: 'top', horizontal: 'left'}} onClose={handleClose}>
                <Alert severity="error" sx={{width: '100%'}} onClose={handleClose}>
                    {msgAlert}
                </Alert>
            </Snackbar>
        </Grid>
    );
}
