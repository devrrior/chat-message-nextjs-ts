import {Socket} from "socket.io-client";
import {SocketEventEnum} from "@/constants/socketEvent.enum";

export const joinRoom = (socket: Socket, roomId: string): void => {
    const payload = {roomId}
    socket.emit(SocketEventEnum.joinRoom, payload);
}

export const leaveRoom = (socket: Socket, roomId: string): void => {
    const payload = {roomId}
    socket.emit(SocketEventEnum.leaveRoom, payload);
}