const SERVER_URL: string = process.env.SERVER_URL || '';

export const listMessagesByRoomId = async (roomId: string): Promise<Response> => {
    return  await fetch(`${SERVER_URL}/chat/messages?roomId=${roomId}`);
}