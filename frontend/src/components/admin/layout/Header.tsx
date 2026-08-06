"use client";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type HeaderProps = {
  title?: string;
};

export default function Header({
  title = "Dashboard",
}: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: "calc(100% - 270px)",
        ml: "270px",
        bgcolor: "#fff",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Left */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Welcome back, Admin
          </Typography>
        </Box>

        {/* Right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: 320,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search..."
              variant="standard"
              slotProps={{
                input: {
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                px: 2,
                py: 0.5,
              }}
            />
          </Paper>

          <IconButton>
            <Badge
              badgeContent={5}
              color="error"
            >
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              bgcolor: "success.main",
            }}
          >
            <AccountCircleIcon />
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}