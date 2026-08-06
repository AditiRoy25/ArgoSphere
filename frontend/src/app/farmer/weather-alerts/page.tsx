"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import WarningAmberIcon
  from "@mui/icons-material/WarningAmber";

import {
  useGetWeatherAlertsQuery,
} from "@/src/redux/api/weatherAlertApi";

import WeatherAlertList
  from "@/src/components/farmer/weather/WeatherAlertList";

export default function WeatherAlertsPage() {

  const {
    data,
    isLoading,
    isError,
    refetch,
  } =
    useGetWeatherAlertsQuery();

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {

    return (

      <Box
        sx={{
          minHeight: "60vh",

          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
        }}
      >

        <CircularProgress
          color="success"
        />

      </Box>

    );

  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {

    return (

      <Container
        maxWidth="xl"
        sx={{ py: 4 }}
      >

        <Alert
          severity="error"
          action={

            <Button
              color="inherit"
              onClick={() =>
                refetch()
              }
            >
              Retry
            </Button>

          }
        >

          Failed to load
          weather alerts.

        </Alert>

      </Container>

    );

  }

  const alerts =
    data?.data ?? [];

  return (

    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >

      {/* HEADER */}

      <Paper
        elevation={0}
        sx={{
          p: 3,

          mb: 3,

          borderRadius: 4,

          border:
            "1px solid #E5E7EB",
        }}
      >

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >

          <Box
            sx={{
              width: 55,
              height: 55,

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
            >

              Weather Alerts

            </Typography>

            <Typography
              color="text.secondary"
              mt={0.5}
            >

              Stay informed about
              severe weather
              conditions affecting
              your farming area.

            </Typography>

          </Box>

        </Stack>

      </Paper>

      {/* TOTAL */}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
        }}
      >

        {alerts.length} weather
        alert
        {alerts.length !== 1
          ? "s"
          : ""}

      </Typography>

      {/* LIST */}

      <WeatherAlertList
        alerts={alerts}
      />

    </Container>

  );

}