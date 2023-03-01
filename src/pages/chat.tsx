import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from "@/pages/components/chat/header";
import Content from "@/pages/components/chat/content";
import BottomBar from "@/pages/components/chat/bottomBar";
import {useRouter} from "next/router";
import {useSocket} from "@/hooks/useSocket";
import {insertInitialMessages, insertOne, setRoomId} from "@/store/slices/chatSlice";
import {SocketEventEnum} from "@/constants/socketEvent.enum";
import {listMessagesByRoomId} from "@/services/message.service";
import {joinRoom, leaveRoom, leaveUser} from "@/services/socket.service";
import {RootState} from "@/store";

export default function Chat() {
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.chat.username);
    const router = useRouter();
    const {socket} = useSocket();

    useEffect(() => {
        if (!router.isReady || !socket) return;
        const {roomId} = router.query;
        fetchMessagesByRoomId(roomId as string);
        joinRoom(socket, roomId as string);

        dispatch(setRoomId({roomId: roomId as string}));

        socket.on(SocketEventEnum.getMessage, (message) => {
            dispatch(insertOne({message: JSON.parse(message)}));
        });

        return () => {
            if (socket) {
                leaveRoom(socket, roomId as string);
                leaveUser(socket, username as string);
            }
        }
    }, [dispatch, joinRoom, leaveRoom, router.isReady, router.query, socket])

    const fetchMessagesByRoomId = async (roomId: string) => {
        const response = await listMessagesByRoomId(roomId);
        const messages = await response.json();

        dispatch(insertInitialMessages({messages}));
    }

    return (
        <div style={{width: '100%', height: '100vh', display: 'grid', gridTemplateRows: '8% 83% 9%'}}>
            <Header/>
            <Content/>
            <BottomBar/>
        </div>
    )
}
