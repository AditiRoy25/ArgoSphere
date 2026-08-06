"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

export default function Topbar() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
    >
      <Toolbar>
        <Typography
          variant="h6"
        >
          Dashboard
        </Typography>

        <Box
         sx={{ ml:"auto"}}
        >
          <Avatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}