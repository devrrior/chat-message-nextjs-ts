import {SocketProviderType} from "@/types/contexts/socketProviderType";
import io from "socket.io-client";
import {SocketContext} from "@/contexts/socket/socketContext";
import {useMemo} from "react";
import * as process from "process";

const SERVER_URL: string = process.env.SERVER_URL || '';
export const SocketProvider = ({children}: SocketProviderType) => {
    const socket = io(`${SERVER_URL}/chat`);

    const contextValue = useMemo(() => {
        return {socket};
    }, [socket]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};