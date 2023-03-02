import {Box, Typography} from "@mui/material";
import {MessagePropsType} from "@/types/props/messageProps.type";
import dateformat from "dateformat";
import {MessageTypeEnum} from "@/constants/messageType.enum";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';

export default function Message({data, author, createdAt, isOwn, type}: MessagePropsType) {
    // # TODO: Refactor styles
    const borderRadius = isOwn ? "24px 24px 0 24px" : "24px 24px 24px 0";
    const backgroundColor = isOwn ? "#1876D2" : "#f2f2f2";
    const messageTextColor = isOwn ? "#ffffff" : "#000000";
    const alignItems = isOwn ? "flex-end" : "flex-start";
    const formattedCreatedAt = dateformat(createdAt, "dddd, mmmm dS, yyyy");

    const downloadFile = (name: string, arrayBuffer: ArrayBuffer, type: string) => {
        const blob = new Blob([arrayBuffer], {type});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = name;

        a.click();

        URL.revokeObjectURL(url);

        return;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems={alignItems}
             margin="5px 0" gap={.8}>
            <Typography variant="body2" fontSize="12px" color={"#505050"}>{formattedCreatedAt}</Typography>
            <Box bgcolor={backgroundColor} borderRadius={borderRadius} padding="4px 14px 6px 12px" maxWidth="60%">
                {type == MessageTypeEnum.text ?
                    <Typography variant="body1" color={messageTextColor}>{data.message}</Typography> :
                    <Box display={"flex"} gap={1} alignItems={"center"}>
                        <InsertDriveFileIcon fontSize={"large"} sx={{color: "#4e4e4e"}}/>
                        <Typography variant="body1" color={messageTextColor}>File</Typography>
                        <DownloadIcon fontSize={"small"} sx={{color: "#000000", cursor: "pointer"}}
                                      onClick={() => downloadFile(data.file.name, data.file.buffer, data.file.type)}/>
                    </Box>
                }
            </Box>
            <Typography variant="body2" fontSize="12px" color={"#505050"}>by {author}</Typography>
        </Box>
    )
}