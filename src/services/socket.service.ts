import {Socket} from "socket.io-client";
import {SocketEventEnum} from "@/constants/socketEvent.enum";

export const joinRoom = (socket: Socket, roomId: string): void => {
    const payload = {roomId};
    socket.emit(SocketEventEnum.joinRoom, payload);
}

export const leaveRoom = (socket: Socket, roomId: string): void => {
    const payload = {roomId};
    socket.emit(SocketEventEnum.leaveRoom, payload);
}

export const joinUser = (socket: Socket, username: string): void => {
    const payload = {username};
    socket.emit(SocketEventEnum.joinUser, payload);
}

export const leaveUser = (socket: Socket, username: string): void => {
    const payload = {username};
    socket.emit(SocketEventEnum.leaveUser, payload);
}

export const sendFile = (socket: Socket, payload: any): void => {
    socket.emit(SocketEventEnum.sendFile, payload);
}
