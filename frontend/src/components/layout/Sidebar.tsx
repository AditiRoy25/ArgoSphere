"use client";

import Link from "next/link";

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const menus = [
  {
    title:
      "Dashboard",
    href:
      "/farmer/dashboard",
  },
  {
    title:
      "Profile",
    href:
      "/farmer/profile",
  },
  {
    title:
      "Farms",
    href:
      "/farmer/farms",
  },
  {
    title:
      "Marketplace",
    href:
      "/farmer/marketplace",
  },
  {
    title:
      "Crop Calendar",
    href:
      "/farmer/crop-calendar",
  },
  {
    title:
      "AI Assistant",
    href:
      "/farmer/ai-assistant",
  },
  {
    title:
      "Settings",
    href:
      "/farmer/settings",
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        minHeight:
          "100vh",
        background:
          "#166534",
        color:
          "#fff",
      }}
    >
      <Typography
       sx={{ variant:"h5",
        fontWeight:700,
        p:3}}
      >
        AgroSphere
      </Typography>

      <List>
        {menus.map(
          (menu) => (
            <Link
              key={
                menu.href
              }
              href={
                menu.href
              }
              style={{
                textDecoration:
                  "none",
              }}
            >
              <ListItemButton>
                <ListItemText
                  primary={
                    menu.title
                  }
                />
              </ListItemButton>
            </Link>
          )
        )}
      </List>
    </Box>
  );
}