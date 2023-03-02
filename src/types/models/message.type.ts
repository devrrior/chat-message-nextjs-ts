import {MessageTypeEnum} from "@/constants/messageType.enum";

export type MessageType = {
    data: any;
    type: MessageTypeEnum;
    author: string;
    createdAt: Date;
}
