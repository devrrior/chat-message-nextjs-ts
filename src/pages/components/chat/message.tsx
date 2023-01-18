import {Box, Typography} from "@mui/material";
import {MessagePropsType} from "@/types/props/messageProps.type";
import dateformat from "dateformat";

export default function Message({message, author, createdAt, isOwn}: MessagePropsType) {
    // # TODO: Refactor styles
    const borderRadius = isOwn ? "24px 24px 0 24px" : "24px 24px 24px 0";
    const backgroundColor = isOwn ? "#1876D2" : "#f2f2f2";
    const messageTextColor = isOwn ? "#ffffff" : "#000000";
    const alignItems = isOwn ? "flex-end" : "flex-start";
    const formattedCreatedAt = dateformat(createdAt, "dddd, mmmm dS, yyyy");

    return (
        <Box display="flex" flexDirection="column" alignItems={alignItems}
             margin="5px 0" gap={.8}>
            <Typography variant="body2" fontSize="12px" color={"#505050"}>{formattedCreatedAt}</Typography>
            <Box bgcolor={backgroundColor} borderRadius={borderRadius} padding="4px 14px 6px 12px" maxWidth="60%">
                <Typography variant="body1" color={messageTextColor}>{message}</Typography>
            </Box>
            <Typography variant="body2" fontSize="12px" color={"#505050"}>by {author}</Typography>
        </Box>
    )
}