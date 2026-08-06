"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FloodIcon from "@mui/icons-material/Flood";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  useGetWeatherAlertsQuery,
} from "@/src/redux/api/weatherAlertApi";

import type {
  WeatherAlert,
} from "@/src/types/weatherAlert";

export default function WeatherAlertSummary() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetWeatherAlertsQuery();

  // ==========================================
  // ICON
  // ==========================================

  const getAlertIcon = (
    type: WeatherAlert["alertType"]
  ) => {
    switch (type) {
      case "rain":
        return <WaterDropIcon />;

      case "storm":
        return <ThunderstormIcon />;

      case "heatwave":
        return <WbSunnyIcon />;

      case "coldwave":
        return <AcUnitIcon />;

      case "flood":
        return <FloodIcon />;

      default:
        return <WarningAmberIcon />;
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          height: "100%",
          borderRadius: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        <CardContent
          sx={{
            minHeight: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="success" />
        </CardContent>
      </Card>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <Card
        elevation={0}
        sx={{
          height: "100%",
          borderRadius: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        <CardContent>
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            }
          >
            Unable to load weather alerts.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // ==========================================
  // FILTER ACTIVE ALERTS
  // ==========================================

  const now = new Date();

  const activeAlerts = (data?.data ?? [])
    .filter((alert) => {
      if (!alert.endTime) {
        return true;
      }

      return new Date(alert.endTime) >= now;
    })
    .sort((a, b) => {
      const severityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return (
        severityOrder[b.severity] -
        severityOrder[a.severity]
      );
    });

  // Only show first 3 on dashboard
  const dashboardAlerts =
    activeAlerts.slice(0, 3);

  // ==========================================
  // EMPTY
  // ==========================================

  if (dashboardAlerts.length === 0) {
    return (
      <Card
        elevation={0}
        sx={{
          height: "100%",
          borderRadius: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            mb={2}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                bgcolor: "#DCFCE7",
                color: "#15803D",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningAmberIcon />
            </Box>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Weather Alerts
            </Typography>
          </Stack>

          <Alert severity="success">
            No active weather alerts at the moment.
          </Alert>

          <Button
            component={Link}
            href="/farmer/weather-alerts"
            color="success"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            View All Alerts
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        bgcolor: "#FFFFFF",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* HEADER */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          mb={3}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                bgcolor: "#FEF3C7",
                color: "#D97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningAmberIcon />
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Weather Alerts
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {activeAlerts.length} active{" "}
                {activeAlerts.length === 1
                  ? "alert"
                  : "alerts"}
              </Typography>
            </Box>
          </Stack>

          <Button
            component={Link}
            href="/farmer/weather-alerts"
            color="success"
            size="small"
            endIcon={<ArrowForwardIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            View All
          </Button>
        </Stack>

        {/* ALERT LIST */}

        <Stack spacing={2}>
          {dashboardAlerts.map((alert) => {
            const isHigh =
              alert.severity === "high";

            const isMedium =
              alert.severity === "medium";

            return (
              <Box
                key={alert._id}
                sx={{
                  p: 2,
                  borderRadius: 3,

                  border: "1px solid",

                  borderColor: isHigh
                    ? "#FECACA"
                    : isMedium
                      ? "#FDE68A"
                      : "#BBF7D0",

                  bgcolor: isHigh
                    ? "#FEF2F2"
                    : isMedium
                      ? "#FFFBEB"
                      : "#F0FDF4",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        mt: 0.3,

                        color: isHigh
                          ? "#DC2626"
                          : isMedium
                            ? "#D97706"
                            : "#16A34A",
                      }}
                    >
                      {getAlertIcon(
                        alert.alertType
                      )}
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        fontWeight={700}
                        textTransform="capitalize"
                      >
                        {alert.alertType} Alert
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        mt={0.5}
                      >
                        <LocationOnIcon
                          sx={{
                            fontSize: 16,
                          }}
                          color="action"
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {alert.district}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Chip
                    label={alert.severity}
                    size="small"
                    color={
                      isHigh
                        ? "error"
                        : isMedium
                          ? "warning"
                          : "success"
                    }
                    sx={{
                      fontWeight: 700,
                      textTransform:
                        "capitalize",
                    }}
                  />
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1.5,
                    lineHeight: 1.6,

                    display:
                      "-webkit-box",

                    WebkitLineClamp: 2,

                    WebkitBoxOrient:
                      "vertical",

                    overflow: "hidden",
                  }}
                >
                  {alert.message}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}