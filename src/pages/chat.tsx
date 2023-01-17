import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import Header from "@/pages/components/chat/header";
import Content from "@/pages/components/chat/content";
import BottomBar from "@/pages/components/chat/bottomBar";
import {useRouter} from "next/router";
import {useSocket} from "@/hooks/useSocket";
import {insertInitialMessages, insertOne, setRoomId} from "@/store/slices/chatSlice";
import {Socket} from "socket.io-client";
import {SocketEventEnum} from "@/constants/socketEvent.enum";

export default function Chat() {
    const dispatch = useDispatch();
    const router = useRouter();
    const {socket} = useSocket();

    const joinRoom = useCallback((socket: Socket, roomId: string) => {
        const payload = {roomId}
        socket.emit(SocketEventEnum.joinRoom, payload);
    }, [])
    const leaveRoom = useCallback((socket: Socket, roomId: string) => {
        const payload = {roomId}
        socket.emit(SocketEventEnum.leaveRoom, payload);
    }, [])

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
            if (socket) leaveRoom(socket, roomId as string);
        }
    }, [dispatch, joinRoom, leaveRoom, router.isReady, router.query, socket])

    const fetchMessagesByRoomId = async (roomId: string) => {
        const response = await fetch(`http://127.0.0.1:3001/chat/messages?roomId=${roomId}`);
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
