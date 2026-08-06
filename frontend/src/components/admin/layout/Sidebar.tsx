"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SchoolIcon from "@mui/icons-material/School";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

const menus = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    href: "/admin/dashboard",
  },
  {
    title: "Users",
    icon: <PeopleIcon />,
    href: "/admin/users",
  },
  {
    title: "Farmers",
    icon: <AgricultureIcon />,
    href: "/admin/farmers",
  },
  {
    title: "Government Schemes",
    icon: <AccountBalanceIcon />,
    href: "/admin/schemes",
  },
  {
    title: "Learning",
    icon: <SchoolIcon />,
    href: "/admin/learning",
  },
  {
    title: "Marketplace",
    icon: <StorefrontIcon />,
    href: "/admin/marketplace",
  },
  {
    title: "Reports",
    icon: <AssessmentIcon />,
    href: "/admin/reports",
  },
  {
    title: "Ngo",
    icon: <SettingsIcon />,
    href: "/admin/ngos",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: 270,
        height: "100vh",
        bgcolor: "#14532d",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
     <Toolbar>
  <Typography
    component={Link}
    href="/"
    variant="h5"
    sx={{
      fontWeight: 700,
      color: "success.main",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >
    AgroSphere
  </Typography>
</Toolbar>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.15)",
        }}
      />

      <List sx={{ mt: 2 }}>
        {menus.map((item) => {
          const active =
            pathname === item.href;

          return (
            <ListItemButton
              key={item.title}
              component={Link}
              href={item.href}
              sx={{
                mx: 1.5,
                mb: 1,
                borderRadius: 2,
                bgcolor: active
                  ? "rgba(255,255,255,.15)"
                  : "transparent",

                "&:hover": {
                  bgcolor:
                    "rgba(255,255,255,.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: 42,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.title}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}