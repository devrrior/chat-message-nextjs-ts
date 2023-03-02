import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import {useRouter} from "next/router";
import {AppRoute} from "@/constants/appRoute";
import {leaveRoom, leaveUser} from "@/services/socket.service";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useSocket} from "@/hooks/useSocket";
import {ChangeEvent, useState} from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function Header() {

    const router = useRouter();
    const username = useSelector((state: RootState) => state.chat.username);
    const roomId = useSelector((state: RootState) => state.chat.roomId);
    const {socket} = useSocket();

    const [usernameDestination, setUsernameDestination] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeUsernameDestination = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUsernameDestination(e.target.value);
    };

    const leaveChat = async () => {
        if (!socket) return;
        leaveRoom(socket, roomId as string);
        leaveUser(socket, username as string);
        await router.push(AppRoute.home)
    };

    const handleJoinButton = async () => {
        handleClose();
        setUsernameDestination('');
        const newRoomId = generateRoomId(username!, usernameDestination);
        await router.push(`${AppRoute.chat}?roomId=${newRoomId}`);
    };

    const handleHomeButton = async () => {
        await router.push(`${AppRoute.chat}?roomId=general`)
    }

    const generateRoomId = (user1: string, user2: string) => {

        user1 = user1.toLowerCase();
        user2 = user2.toLowerCase();
        const users = [user1, user2];
        users.sort();
        const joinedUsers = users.join("_");

        return "private_chat_" + joinedUsers;
    }

    return (
        <Box bgcolor="#f1f1f1" width="100%" height="100%" display="flex" justifyContent="space-between"
             alignItems="center" px="2%"
             boxSizing="border-box"
             sx={{
                 borderBottomLeftRadius: "10px",
                 borderBottomRightRadius: "10px",
             }}>
            <Typography variant="h5">{roomId}</Typography>
            <Box>
                <IconButton onClick={handleOpen}>
                    <AddIcon style={{color: "#0077ff"}}/>
                </IconButton>
                <IconButton onClick={handleHomeButton}>
                    <HomeIcon style={{color: "#489d25"}}/>
                </IconButton>
                <IconButton onClick={() => leaveChat()}>
                    <LogoutIcon style={{color: "#d20303"}}/>
                </IconButton>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6">
                        Write the user you want to talk to:
                    </Typography>
                    <br/>
                    <Box display={"flex"} alignItems={"center"} gap={4}>
                        <TextField id="username" label="Username" variant="outlined" value={usernameDestination}
                                   onChange={handleChangeUsernameDestination}/>
                        <Button variant={"contained"} onClick={handleJoinButton}>Join</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}