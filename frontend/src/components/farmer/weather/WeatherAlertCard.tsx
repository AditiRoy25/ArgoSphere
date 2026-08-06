"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import ThunderstormIcon
  from "@mui/icons-material/Thunderstorm";

import WaterDropIcon
  from "@mui/icons-material/WaterDrop";

import WbSunnyIcon
  from "@mui/icons-material/WbSunny";

import AcUnitIcon
  from "@mui/icons-material/AcUnit";

import FloodIcon
  from "@mui/icons-material/Flood";

import LocationOnIcon
  from "@mui/icons-material/LocationOn";

import AccessTimeIcon
  from "@mui/icons-material/AccessTime";

import type {
  WeatherAlert,
} from "@/src/types/weatherAlert";

interface Props {
  alert: WeatherAlert;
}

export default function WeatherAlertCard({
  alert,
}: Props) {

  // ==========================================
  // ALERT ICON
  // ==========================================

  const getIcon = () => {

    switch (
      alert.alertType
    ) {

      case "rain":
        return (
          <WaterDropIcon />
        );

      case "storm":
        return (
          <ThunderstormIcon />
        );

      case "heatwave":
        return (
          <WbSunnyIcon />
        );

      case "coldwave":
        return (
          <AcUnitIcon />
        );

      case "flood":
        return (
          <FloodIcon />
        );

      default:
        return (
          <ThunderstormIcon />
        );
    }

  };

  // ==========================================
  // SEVERITY COLOR
  // ==========================================

  const severityColor =
    alert.severity === "high"
      ? "error"
      : alert.severity === "medium"
        ? "warning"
        : "success";

  // ==========================================
  // UI
  // ==========================================

  return (

    <Card
      elevation={0}
      sx={{
        height: "100%",

        border:
          "1px solid #E5E7EB",

        borderRadius: 4,

        transition:
          "all 0.3s ease",

        "&:hover": {
          transform:
            "translateY(-4px)",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        },
      }}
    >

      <CardContent
        sx={{
          p: 3,
        }}
      >

        {/* HEADER */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >

            <Box
              sx={{
                width: 48,
                height: 48,

                borderRadius: 3,

                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",

                bgcolor:
                  alert.severity ===
                  "high"
                    ? "#FEE2E2"
                    : alert.severity ===
                        "medium"
                      ? "#FEF3C7"
                      : "#DCFCE7",

                color:
                  alert.severity ===
                  "high"
                    ? "#DC2626"
                    : alert.severity ===
                        "medium"
                      ? "#D97706"
                      : "#16A34A",
              }}
            >

              {getIcon()}

            </Box>

            <Box>

              <Typography
                variant="h6"
                fontWeight={700}
                textTransform="capitalize"
              >
                {alert.alertType}
              </Typography>

              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
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
            label={
              alert.severity
            }
            color={
              severityColor
            }
            size="small"
            sx={{
              fontWeight: 700,
              textTransform:
                "capitalize",
            }}
          />

        </Stack>

        {/* MESSAGE */}

        <Typography
          color="text.secondary"
          sx={{
            mt: 2,
            lineHeight: 1.7,

            display:
              "-webkit-box",

            WebkitLineClamp: 3,

            WebkitBoxOrient:
              "vertical",

            overflow: "hidden",
          }}
        >

          {alert.message}

        </Typography>

        {/* DATE */}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            mt: 2,
          }}
        >

          <AccessTimeIcon
            sx={{
              fontSize: 18,
            }}
            color="action"
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >

            {new Date(
              alert.startTime
            ).toLocaleDateString(
              "en-IN"
            )}

            {" - "}

            {new Date(
              alert.endTime
            ).toLocaleDateString(
              "en-IN"
            )}

          </Typography>

        </Stack>

        {/* DETAILS */}

        <Button
          component={Link}
          href={
            `/farmer/weather-alerts/${alert._id}`
          }
          fullWidth
          variant="outlined"
          color="success"
          sx={{
            mt: 3,

            borderRadius: 2.5,

            textTransform:
              "none",

            fontWeight: 600,
          }}
        >

          View Details

        </Button>

      </CardContent>

    </Card>

  );

}