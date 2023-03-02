import {MessageTypeEnum} from "@/constants/messageType.enum";

export type MessagePropsType = {
    data: any;
    author: string;
    createdAt: string;
    isOwn: boolean;
    type: MessageTypeEnum;
}