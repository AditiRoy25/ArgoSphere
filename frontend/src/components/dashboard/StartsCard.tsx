"use client";

import Grid from "@mui/material/Grid";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import SpaIcon from "@mui/icons-material/Spa";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

import StatCard from "./StartCards";

export default function StatsCards() {
  return (
    <Grid
      container
      spacing={3}
      sx={{ mb: 4 }}
    >
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Total Farms"
          value={3}
          subtitle="2 Active"
          color="#1B8F3A"
          icon={<AgricultureIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Total Crops"
          value={5}
          subtitle="Growing"
          color="#4A90E2"
          icon={<SpaIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Marketplace Orders"
          value={2}
          subtitle="In Progress"
          color="#F4B400"
          icon={<ShoppingBagIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Weather Alerts"
          value={1}
          subtitle="View Alerts"
          color="#44C4D9"
          icon={<CloudQueueIcon />}
        />
      </Grid>
    </Grid>
  );
}
