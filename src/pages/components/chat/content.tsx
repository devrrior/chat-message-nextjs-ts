import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import type {RootState} from "@/store";
import {MessageType} from "@/types/models/message.type";
import {MessageTypeEnum} from "@/constants/messageType.enum";
import Message from "@/pages/components/chat/message";

export default function Content() {

    const username = useSelector((state: RootState) => state.chat.username);
    const messages = useSelector((state: RootState) => state.chat.messages);

    const renderMessages = (messages: MessageType[] | null) => {
        if (!messages) return;

        return messages.map((message, index) => {
            if (message.type == MessageTypeEnum.text) {
                return <Message key={index} data={message.data} author={message.author}
                                createdAt={message.createdAt.toString()} isOwn={message.author == username}
                                type={message.type}/>
            } else if (message.type == MessageTypeEnum.file) {
                return <Message key={index} data={message.data} author={message.author}
                                createdAt={message.createdAt.toString()} isOwn={message.author == username}
                                type={MessageTypeEnum.file}/>
            }
        });
    }

    return <>
        {
            <Box display="flex" flexDirection="column-reverse" padding="10px 24px 10px 24px"
                 style={{overflowY: "scroll"}}>
                {renderMessages(messages)}
            </Box>
        }
    </>
}