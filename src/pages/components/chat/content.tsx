import {Box, CircularProgress} from "@mui/material";
import Message from "@/pages/components/chat/message";
import {useSelector} from "react-redux";
import {MessageType} from "@/types/models/message.type";
import type {RootState} from "@/store";

export default function Content() {

    const messages = useSelector((state: RootState) => state.chat.messages);
    const username = useSelector((state: RootState) => state.chat.username);

    const renderMessages = (messages: MessageType[]) => {
        return messages.map((message, index) => {
            return <Message key={index} message={message.message} author={message.author}
                            createdAt={message.createdAt.toString()} isOwn={message.author == username}/>
        })
    }

    return (
        <>
            {
                messages ?
                    <Box display="flex" flexDirection="column-reverse" padding="10px 24px 10px 24px"
                         style={{overflowY: "scroll"}}>
                        {renderMessages(messages)}
                    </Box>
                    :
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress/>
                    </Box>
            }
        </>
    )
}