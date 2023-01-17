import {useContext} from "react";
import {SocketContext} from "@/contexts/socket/socketContext";

export const useSocket = () => {
    const {socket} = useContext(SocketContext)

    return {socket};
}