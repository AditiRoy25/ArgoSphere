"use client";

import Link
  from "next/link";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon
  from "@mui/icons-material/ArrowBack";

import LocationOnIcon
  from "@mui/icons-material/LocationOn";

import WarningAmberIcon
  from "@mui/icons-material/WarningAmber";

import AccessTimeIcon
  from "@mui/icons-material/AccessTime";

import {
  useParams,
} from "next/navigation";

import {
  useGetWeatherAlertQuery,
} from "@/src/redux/api/weatherAlertApi";

export default function WeatherAlertDetailsPage() {

  const params =
    useParams<{
      id: string;
    }>();

  const {
    data,
    isLoading,
    isError,
  } =
    useGetWeatherAlertQuery(
      params.id
    );

  if (isLoading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "center",
          py: 10,
        }}
      >

        <CircularProgress
          color="success"
        />

      </Box>

    );

  }

  if (
    isError ||
    !data?.data
  ) {

    return (

      <Container
        maxWidth="md"
        sx={{ py: 4 }}
      >

        <Alert
          severity="error"
        >
          Weather alert
          not found.
        </Alert>

      </Container>

    );

  }

  const alert =
    data.data;

  const severityColor =
    alert.severity === "high"
      ? "error"
      : alert.severity === "medium"
        ? "warning"
        : "success";

  return (

    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >

      <Button
        component={Link}
        href="/farmer/weather-alerts"
        startIcon={
          <ArrowBackIcon />
        }
        color="success"
        sx={{
          mb: 2,
        }}
      >

        Back to Alerts

      </Button>

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 3,
            md: 4,
          },

          borderRadius: 4,

          border:
            "1px solid #E5E7EB",
        }}
      >

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          spacing={2}
        >

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >

            <Box
              sx={{
                width: 60,
                height: 60,

                borderRadius: 3,

                bgcolor:
                  "#FEF3C7",

                color:
                  "#D97706",

                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >

              <WarningAmberIcon
                fontSize="large"
              />

            </Box>

            <Box>

              <Typography
                variant="h4"
                fontWeight={700}
                textTransform="capitalize"
              >
                {alert.alertType}
                {" "}Alert
              </Typography>

              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
              >

                <LocationOnIcon
                  fontSize="small"
                  color="action"
                />

                <Typography
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
            sx={{
              textTransform:
                "capitalize",

              fontWeight: 700,
            }}
          />

        </Stack>

        <Divider
          sx={{
            my: 3,
          }}
        />

        <Typography
          variant="h6"
          fontWeight={700}
          mb={1}
        >

          Alert Message

        </Typography>

        <Typography
          color="text.secondary"
          lineHeight={1.8}
        >

          {alert.message}

        </Typography>

        <Divider
          sx={{
            my: 3,
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >

          <AccessTimeIcon
            color="success"
          />

          <Box>

            <Typography
              variant="body2"
              fontWeight={700}
            >
              Alert Duration
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >

              {new Date(
                alert.startTime
              ).toLocaleString(
                "en-IN"
              )}

              {" - "}

              {new Date(
                alert.endTime
              ).toLocaleString(
                "en-IN"
              )}

            </Typography>

          </Box>

        </Stack>

      </Paper>

    </Container>

  );

}