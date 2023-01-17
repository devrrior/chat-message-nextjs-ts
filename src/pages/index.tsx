import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import Image from 'next/image';
import * as yup from 'yup';
import {useFormik} from "formik";
import {HomeFormType} from "@/types/forms/homeForm.type";
import {useDispatch} from "react-redux";
import {setUsername} from "@/store/slices/chatSlice";
import {useRouter} from "next/router";
import {AppRoute} from "@/constants/appRoute";

export default function Home() {
    const dispatch = useDispatch();
    const router = useRouter();

    const validationSchema = yup.object().shape({
        username: yup.string().matches(/^\S*$/, 'No spaces allowed').required('Username is required')
    });

    const initialValues: HomeFormType = {
        username: '',
    }

    const handleSubmit = async (values: HomeFormType) => {
        dispatch(setUsername({username: values.username}));
        await router.push(`${AppRoute.chat}?roomId=general`);
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    })

    return (
        <Grid container width='100%' height='100vh'>
            <Grid container xs={5} justifyContent='center' item>
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
            <Grid container xs={7} justifyContent='center' alignItems='center' item>
                <Image src='./chat-message-app.svg' alt='chat-message-app' width={600} height={400} draggable='false'/>
            </Grid>
        </Grid>
    );
}
