import {createContext} from "react";
import {SocketContextType} from "@/types/contexts/socketContextType";

export const SocketContext = createContext<SocketContextType>(
    {} as SocketContextType
);