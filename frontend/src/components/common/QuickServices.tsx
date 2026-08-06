"use client";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
// import EcoIcon from "@mui/icons-material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SchoolIcon from "@mui/icons-material/School";
import CompostIcon from "@mui/icons-material/Compost";
const services = [
  {
    title: "Seed Marketplace",
    icon: <AgricultureIcon fontSize="large" />,
  },
  {
  title: "Bio Fertilizer",
  icon: <CompostIcon fontSize="large" />,
},
  {
    title: "Farm Equipment ",
    icon: <PrecisionManufacturingIcon fontSize="large" />,
  },
  {
    title: "Crop Calendar",
    icon: <CalendarMonthIcon fontSize="large" />,
  },
  {
    title: "AI Assistant",
    icon: <SmartToyIcon fontSize="large" />,
  },
  {
    title: "Gov. Schemes",
    icon: <AccountBalanceIcon fontSize="large" />,
  },
  {
    title: "Weather Alerts",
    icon: <CloudQueueIcon fontSize="large" />,
  },
  {
    title: "Learning Portal",
    icon: <SchoolIcon fontSize="large" />,
  },
];

export default function QuickServices() {
  return (
    <Box
      sx={{
        py:0,
        bgcolor: "#F8FBF8",
      }}
    >
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            p: 4,
            bgcolor: "#F1F8F2",
          }}
        >
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid
                key={service.title}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                  lg: 1.5,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 4,
                    bgcolor: "#fff",
                    transition: ".3s",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow:
                        "0 10px 25px rgba(0,0,0,.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "primary.main",
                      mb: 2,
                    }}
                  >
                    {service.icon}
                  </Box>

                  <Typography
                    sx={{fontWeight:600,
                    fontSize:14}}
                  >
                    {service.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}