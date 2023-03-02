import {Box, Button, TextField} from "@mui/material";
import {MessageFormType} from "@/types/forms/messageForm.type";
import * as yup from "yup";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useSocket} from "@/hooks/useSocket";
import {SocketEventEnum} from "@/constants/socketEvent.enum";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {ChangeEvent} from "react";
import {sendFile} from "@/services/socket.service";
import {MessageTypeEnum} from "@/constants/messageType.enum";

export default function BottomBar() {
    const {socket} = useSocket();
    const username = useSelector((state: RootState) => state.chat.username);
    const roomId = useSelector((state: RootState) => state.chat.roomId);

    const initialValues: MessageFormType = {
        message: '',
    }

    const validationSchema = yup.object().shape({
        message: yup.string().required('Message is required')
    });

    const handleSubmit = async (values: MessageFormType) => {
        if (!socket || !username || !roomId) return

        const currentDate = new Date();

        socket.emit(SocketEventEnum.sendMessage, {
            message: values.message,
            author: username,
            roomId,
            createdAt: currentDate,
            type: MessageTypeEnum.text,
        })

        formik.resetForm();
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    })

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!socket || !roomId || !username) return;

        const file = event.target.files && event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const fileContent = reader.result;
            const currentDate = new Date();

            sendFile(socket, {
                file: {
                    name: file.name,
                    buffer: fileContent,
                    type: file.type,
                },
                author: username,
                roomId,
                createdAt: currentDate,
                type: MessageTypeEnum.file,
            });
        }

        reader.readAsArrayBuffer(file);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box bgcolor="#f1f1f1" width="100%" height="100%" display="flex" justifyContent="space-between"
                 alignItems="center" px="2%" gap={5} boxSizing="border-box">
                <Box width="90%" display="flex">
                    <Button variant="text" component="label" sx={{width: '5%', padding: '0', color: "#797979"}}>
                        <AttachFileIcon/>
                        <input type="file" hidden onChange={handleFileChange}/>
                    </Button>
                    <TextField name="message"
                               placeholder="Type something"
                               variant="standard"
                               sx={{width: "95%", height: "60%"}}
                               value={formik.values.message}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               error={formik.touched.message && Boolean(formik.errors.message)}
                               helperText={formik.touched.message && formik.errors.message}
                               autoComplete='off'
                    />
                </Box>
                <Button variant="contained" sx={{width: "10%", height: "60%"}} type="submit">Send</Button>
            </Box>
        </form>
    )
}
