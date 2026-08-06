"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

// ==========================================
// DASHBOARD COMPONENTS
// ==========================================

import Sidebar from "./Sidebar";
import Header from "./Header";

import WelcomeBanner from "./WelcomeBanner";
import StatsCards from "./StartsCard";

import MyFarms from "../farmer/dashboard/Myfarm";
import FarmOverview from "./FarmOverview";

import WeatherAlertSummary from "../farmer/weather/WeatherAlertSummary";
import QuickActions from "./QuickActions";

import CropCalendar from "./CropCalender";
import AIRecommendation from "./AIRecommendation";

import Notifications from "./Notifications";
import LearningPortal from "./LearningProtal";

import DashboardCharts from "./DashboardCharts";
import MarketplaceOrders from "./MarketplaceOrder";

import GovernmentSchemeCard from "./GovernmentSchemeCard";
import SoilHealthCard from "./SoilHealth";

import RecentActivity from "./RecentActivity";
import HelpCard from "./Helpcard";

// ==========================================
// DASHBOARD LAYOUT
// ==========================================

export default function DashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
      }}
    >
      {/* ==================================
          SIDEBAR
      ================================== */}

      <Sidebar />

      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,

          display: "flex",
          flexDirection: "column",

          minHeight: "100vh",
        }}
      >
        {/* ==================================
            HEADER
        ================================== */}

        <Header />

        {/* ==================================
            DASHBOARD CONTENT
        ================================== */}

        <Box
          sx={{
            flex: 1,

            p: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },

            bgcolor: "#F5F7FA",

            overflowX: "hidden",
          }}
        >
          {/* ==================================
              WELCOME BANNER
          ================================== */}

          <Box sx={{ mb: 3 }}>
            <WelcomeBanner />
          </Box>

          {/* ==================================
              STATISTICS
          ================================== */}

          <Box sx={{ mb: 3 }}>
            <StatsCards />
          </Box>

          {/* ==================================
              MY FARMS
          ================================== */}

          <Box sx={{ mb: 3 }}>
            <MyFarms />
          </Box>

          {/* ==================================
              FARM OVERVIEW + WEATHER ALERT
          ================================== */}

          <Grid
            container
            spacing={3}
            sx={{
              mb: 3,
            }}
          >
            {/* FARM OVERVIEW */}

            <Grid
              size={{
                xs: 12,
                lg: 8,
              }}
            >
              <FarmOverview />
            </Grid>

            {/* WEATHER ALERT + QUICK ACTION */}

            <Grid
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              <Box
                sx={{
                  height: "100%",

                  display: "flex",
                  flexDirection: "column",

                  gap: 3,
                }}
              >
                <WeatherAlertSummary />

                <QuickActions />
              </Box>
            </Grid>
          </Grid>

          {/* ==================================
              CROP CALENDAR + AI
          ================================== */}

          <Grid
            container
            spacing={3}
            sx={{
              mb: 3,
            }}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <CropCalendar />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <AIRecommendation />
            </Grid>
          </Grid>

          {/* ==================================
              NOTIFICATIONS + LEARNING
          ================================== */}

          <Grid
            container
            spacing={3}
            sx={{
              mb: 3,
            }}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Notifications />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <LearningPortal />
            </Grid>
          </Grid>

          {/* ==================================
              ANALYTICS + MARKETPLACE
          ================================== */}

          <Grid
            container
            spacing={3}
            sx={{
              mb: 3,
            }}
          >
            <Grid
              size={{
                xs: 12,
                lg: 8,
              }}
            >
              <DashboardCharts />
            </Grid>

            <Grid
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              <MarketplaceOrders />
            </Grid>
          </Grid>

          {/* ==================================
              GOVERNMENT SCHEME + SOIL
          ================================== */}

          <Grid
            container
            spacing={3}
            sx={{
              mb: 3,
            }}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <GovernmentSchemeCard />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <SoilHealthCard />
            </Grid>
          </Grid>

          {/* ==================================
              WEATHER ALERT + RECENT ACTIVITY
          ================================== */}

          <Grid
            container
            spacing={3}
            sx={{
              mb: 3,
            }}
          >
            <Grid
              size={{
                xs: 12,
                lg: 6,
              }}
            >
              <WeatherAlertSummary />
            </Grid>

            <Grid
              size={{
                xs: 12,
                lg: 6,
              }}
            >
              <RecentActivity />
            </Grid>
          </Grid>

          {/* ==================================
              HELP
          ================================== */}

          <Box>
            <HelpCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}