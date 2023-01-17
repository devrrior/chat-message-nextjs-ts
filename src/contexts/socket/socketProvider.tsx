import {SocketProviderType} from "@/types/contexts/socketProviderType";
import io from "socket.io-client";
import {SocketContext} from "@/contexts/socket/socketContext";
import {useMemo} from "react";

export const SocketProvider = ({children}: SocketProviderType) => {
    const socket = io('http://127.0.0.1:3001/chat');

    const contextValue = useMemo(() => {
        return {socket};
    }, [socket]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};