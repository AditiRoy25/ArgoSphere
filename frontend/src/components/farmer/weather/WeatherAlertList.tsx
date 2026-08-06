"use client";

import {
  Alert,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import WeatherAlertCard
  from "./WeatherAlertCard";

import type {
  WeatherAlert,
} from "@/src/types/weatherAlert";

interface Props {
  alerts: WeatherAlert[];
}

export default function WeatherAlertList({
  alerts,
}: Props) {

  if (
    alerts.length === 0
  ) {

    return (

      <Alert
        severity="success"
      >
        No weather alerts
        available for your
        district.
      </Alert>

    );

  }

  return (

    <Grid
      container
      spacing={3}
    >

      {alerts.map(
        (alert) => (

          <Grid
            key={
              alert._id
            }
            size={{
              xs: 12,
              md: 6,
              lg: 4,
            }}
          >

            <WeatherAlertCard
              alert={alert}
            />

          </Grid>

        )
      )}

    </Grid>

  );

}