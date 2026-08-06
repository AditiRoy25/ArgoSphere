"use client";

import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

// ==========================================
// PROPS
// ==========================================

interface SchemeStatsProps {
  totalSchemes?: number;
  centralSchemes?: number;
  stateSchemes?: number;
  eligibleSchemes?: number;
}

// ==========================================
// COMPONENT
// ==========================================

export default function SchemeStats({
  totalSchemes = 0,
  centralSchemes = 0,
  stateSchemes = 0,
  eligibleSchemes = 0,
}: SchemeStatsProps) {
  const stats = [
    {
      title: "Total Schemes",
      value: totalSchemes,
      subtitle: "Government schemes available",
      icon: (
        <EmojiEventsOutlinedIcon
          color="success"
          fontSize="large"
        />
      ),
    },
    {
      title: "Central Schemes",
      value: centralSchemes,
      subtitle: "Available across India",
      icon: (
        <AccountBalanceOutlinedIcon
          color="success"
          fontSize="large"
        />
      ),
    },
    {
      title: "State Schemes",
      value: stateSchemes,
      subtitle: "State specific schemes",
      icon: (
        <LocationCityOutlinedIcon
          color="success"
          fontSize="large"
        />
      ),
    },
    {
      title: "Eligible Schemes",
      value: eligibleSchemes,
      subtitle: "Eligible for current filters",
      icon: (
        <CheckCircleOutlineOutlinedIcon
          color="success"
          fontSize="large"
        />
      ),
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((item) => (
        <Grid
          key={item.title}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
              transition: "0.3s",

              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
                borderColor: "success.main",
              },
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                {item.icon}

                <Stack spacing={0.5}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    color="success.main"
                    fontWeight={700}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.subtitle}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}