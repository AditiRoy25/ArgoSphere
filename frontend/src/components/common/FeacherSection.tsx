"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SchoolIcon from "@mui/icons-material/School";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const features = [
  {
    title: "Farm Management",
    description:
      "Manage your farms, soil health, crop history and production records.",
    icon: <AgricultureIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Marketplace",
    description:
      "Buy and sell seeds, fertilizers, equipment and farming products.",
    icon: <ShoppingCartIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Crop Calendar",
    description:
      "Plan sowing, irrigation, fertilizer and harvesting schedules.",
    icon: <CalendarMonthIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "AI Assistant",
    description:
      "Get AI-powered farming advice, crop diagnosis and recommendations.",
    icon: <SmartToyIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Learning Portal",
    description:
      "Watch videos, attend workshops and improve farming knowledge.",
    icon: <SchoolIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Weather Alerts",
    description:
      "Receive real-time weather forecasts and emergency notifications.",
    icon: <CloudQueueIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "Government Schemes",
    description:
      "Discover subsidies, schemes and apply online easily.",
    icon: <AccountBalanceIcon sx={{ fontSize: 55 }} />,
  },
  {
    title: "NGO & Vlogs",
    description:
      "Learn from NGO training videos and expert agriculture content.",
    icon: <VideoLibraryIcon sx={{ fontSize: 55 }} />,
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{py:10, bgcolor:"#F8FBF8"}}>
      <Container maxWidth="xl">

        <Typography
          variant="h3"
         sx={{ textAlign:"center",
          fontWeight:700,
          mb:2}}
        >
          Everything You Need for{" "}
          <Box component="span" color="primary.main">
            Modern Farming
          </Box>
        </Typography>

        <Typography
          sx={{textAlign:"center",
          color:"text.secondary",
          mb:7}}
        >
          Smart digital tools to empower farmers,
          NGOs and government agencies.
        </Typography>

        <Grid container spacing={4}>
          {features.map((item) => (
            <Grid
              key={item.title}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 5,
                  transition: ".35s",
                  boxShadow:
                    "0 5px 18px rgba(0,0,0,.06)",

                  "&:hover": {
                    transform:
                      "translateY(-10px)",
                    boxShadow:
                      "0 18px 40px rgba(0,0,0,.12)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>

                  <Box
                    sx={{
                      color: "primary.main",
                      mb: 3,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{fontWeight:700,
                    mb:2}}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      minHeight: 90,
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Button
                    sx={{
                      mt: 3,
                      fontWeight: 700,
                    }}
                  >
                    Explore →
                  </Button>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}