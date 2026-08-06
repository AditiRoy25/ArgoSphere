"use client";

import Link from "next/link";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const menus = [
  {
    title: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    href: "/farmer/dashboard",
  },
  {
    title: "My Profile",
    icon: <PersonOutlineOutlinedIcon />,
    href: "/farmer/profile",
  },
  {
    title: "My Farms",
    icon: <AgricultureOutlinedIcon />,
    href: "/farmer/farms",
  },
  {
    title: "Crop Calendar",
    icon: <CalendarMonthOutlinedIcon />,
    href: "/farmer/crop-calendar",
  },
  {
    title: "Marketplace",
    icon: <StorefrontOutlinedIcon />,
    href: "/marketplace",
  },
  {
    title: "Weather Alerts",
    icon: <CloudOutlinedIcon />,
    href: "/farmer/weather-alerts",
  },
  {
    title: "AI Assistant",
    icon: <SmartToyOutlinedIcon />,
    href: "/farmer/ai",
  },
  {
    title: "Learning Portal",
    icon: <SchoolOutlinedIcon />,
    href: "/learning",
  },
  {
    title: "Schemes",
    icon: <AccountBalanceOutlinedIcon />,
    href: "/schemes",
  },
  {
    title: "Reports",
    icon: <BarChartOutlinedIcon />,
    href: "/farmer/reports",
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 290,
        bgcolor: "#fff",
        borderRight: "1px solid #ECECEC",
      }}
    >
      <Box
        sx={{
          py: 3,
          px: 4,
          borderBottom: "1px solid #ECECEC",
        }}
      >
      <Typography
  component={Link}
  href="/"
  variant="h4"
  color="success.main"
  sx={{
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
  }}
>
  AgroSphere
</Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Smart Farming
        </Typography>
      </Box>

      <List>

        {menus.map((menu) => (
          <Link
            key={menu.title}
            href={menu.href}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ListItemButton
              sx={{
                mx: 2,
                my: 1,
                borderRadius: 3,
              }}
            >
              <ListItemIcon>
                {menu.icon}
              </ListItemIcon>

              <ListItemText
                primary={menu.title}
              />
            </ListItemButton>
          </Link>
        ))}

      </List>
    </Box>
  );
}
