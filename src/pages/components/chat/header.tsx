import {Box, Typography} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
    return (
        <Box bgcolor="#f1f1f1" width="100%" height="100%" display="flex" justifyContent="space-between"
             alignItems="center" px="2%"
             boxSizing="border-box"
             sx={{
                 borderBottomLeftRadius: "10px",
                 borderBottomRightRadius: "10px",
             }}>
            <Typography variant="h5">{"World's chat"}</Typography>
            <LogoutIcon style={{color: "#d20303"}}/>
        </Box>
    )
}