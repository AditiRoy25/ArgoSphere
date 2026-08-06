"use client";

import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Box,
} from "@mui/material";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

interface DashboardStatsProps {
  stats?: {
    totalUsers: number;
    totalFarmers: number;
    totalNGOs: number;
    totalOrders: number;
    totalSchemeApplications: number;
  };
}

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers ?? 0,
      color: "#1976d2",
      icon: <PeopleAltRoundedIcon />,
    },
    {
      title: "Farmers",
      value: stats?.totalFarmers ?? 0,
      color: "#2e7d32",
      icon: <AgricultureRoundedIcon />,
    },
    {
      title: "NGOs",
      value: stats?.totalNGOs ?? 0,
      color: "#ef6c00",
      icon: <AccountBalanceRoundedIcon />,
    },
    {
      title: "Marketplace Orders",
      value: stats?.totalOrders ?? 0,
      color: "#6a1b9a",
      icon: <ShoppingCartRoundedIcon />,
    },
    {
      title: "Scheme Applications",
      value: stats?.totalSchemeApplications ?? 0,
      color: "#c62828",
      icon: <AssignmentTurnedInRoundedIcon />,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((item) => (
        <Grid
          key={item.title}
          size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
              transition: ".3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 5,
              },
            }}
          >
            <CardContent>
              <Stack
                sx={{  direction:"row",
                    justifyContent:"space-between",
                    alignItems:"center"}}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h4"
                  sx={{  fontWeight:700,
                    mt:1}}
                  >
                    {item.value}
                  </Typography>

                  <Stack
                   sx={{ direction:"row",
                    spacing:0.5,
                    alignItems:"center",
                    mt:1}}
                  >
                    <TrendingUpRoundedIcon
                      sx={{
                        color: "success.main",
                        fontSize: 18,
                      }}
                    />

                    <Typography
                      variant="body2"
                      color="success.main"
                      sx={{fontWeight:600}}
                    >
                      Live
                    </Typography>
                  </Stack>
                </Box>

                <Avatar
                  sx={{
                    bgcolor: item.color,
                    width: 56,
                    height: 56,
                  }}
                >
                  {item.icon}
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}