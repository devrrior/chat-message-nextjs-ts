import {Box, Button, TextField} from "@mui/material";
import {MessageFormType} from "@/types/forms/messageForm.type";
import * as yup from "yup";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useSocket} from "@/hooks/useSocket";
import {SocketEventEnum} from "@/constants/socketEvent.enum";

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

        socket.emit(SocketEventEnum.sendMessage, {
            message: values.message,
            author: username,
            roomId,
        })

        formik.resetForm();
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box bgcolor="#f1f1f1" width="100%" height="100%" display="flex" justifyContent="space-between"
                 alignItems="center" px="2%" gap={5} boxSizing="border-box">
                <TextField name="message"
                           placeholder="Type something"
                           variant="standard"
                           sx={{width: "90%", height: "60%"}}
                           value={formik.values.message}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.message && Boolean(formik.errors.message)}
                           helperText={formik.touched.message && formik.errors.message}
                           autoComplete='off'
                />
                <Button variant="contained" sx={{width: "10%", height: "60%"}} type="submit">Send</Button>
            </Box>
        </form>
    )
}
