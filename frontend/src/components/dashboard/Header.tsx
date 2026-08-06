"use client";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#111827",
        borderBottom: "1px solid #ECECEC",
      }}
    >
      <Toolbar>

        <IconButton>
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <Badge
            badgeContent={3}
            color="success"
          >
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>

        <Avatar
          src="/images/user.jpg"
          sx={{
            ml: 3,
            mr: 1,
          }}
        />

        <Box>

          <Typography
            sx={{ fontWeight: 700 }}
          >
            Ramesh Kumar
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Farmer
          </Typography>

        </Box>

        <KeyboardArrowDownIcon />

      </Toolbar>
    </AppBar>
  );
}
