export enum SocketEventEnum {
    getMessage = 'event_get_message',
    sendMessage = 'event_send_message',
    joinRoom = 'event_join_room',
    leaveRoom = 'event_leave_room',
    joinUser = 'event_join_user',
    leaveUser = 'event_leave_user',
    notifications = 'event_notifications',
    sendFile = 'event_send_file',
    getFile = 'event_get_file',
}