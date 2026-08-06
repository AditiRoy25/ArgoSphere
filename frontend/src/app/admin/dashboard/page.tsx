"use client";

import Grid from "@mui/material/Grid";
import { Alert, CircularProgress } from "@mui/material";

import {
  useGetDashboardStatsQuery,
} from "../../../redux/api/adminApi";

import DashboardStats from "../../../components/admin/dashboard/DashboardStarts";
import UserGrowthChart from "../../../components/admin/dashboard/UserGrowthChart";
import UsersRoleChart from "../../../components/admin/dashboard/UsersRoleChart";
import MarketplaceOverview from "../../../components/admin/dashboard/MarketplaceOverview";
import RecentRegistrations from "../../../components/admin/dashboard/RecentRegistrations";
import SystemAlerts from "../../../components/admin/dashboard/SystemAlerts";
import RecentActivities from "../../../components/admin/dashboard/RecentActivities";
import QuickActions from "../../../components/admin/dashboard/QuickActions";

export default function AdminDashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        {(error as any)?.data?.message ??
          "Failed to load dashboard"}
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Statistics */}
      <Grid size={{ xs: 12 }}>
        <DashboardStats
          stats={data?.stats}
        />
      </Grid>

      {/* Charts */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <UserGrowthChart
          data={data?.userGrowth}
        />
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <UsersRoleChart
          data={data?.roleDistribution}
        />
      </Grid>

      {/* Marketplace */}
      <Grid size={{ xs: 12, md: 6 }}>
        <MarketplaceOverview
          data={data?.marketplace}
        />
      </Grid>

      {/* Recent Users */}
      <Grid size={{ xs: 12, md: 6 }}>
        <RecentRegistrations
          users={data?.recentUsers}
        />
      </Grid>

      {/* Alerts */}
      <Grid size={{ xs: 12 }}>
        <SystemAlerts
          alerts={data?.alerts}
        />
      </Grid>

      {/* Activities */}
      <Grid size={{ xs: 12 }}>
        <RecentActivities
          activities={data?.activities}
        />
      </Grid>

      {/* Quick Actions */}
      <Grid size={{ xs: 12 }}>
        <QuickActions />
      </Grid>
    </Grid>
  );
}