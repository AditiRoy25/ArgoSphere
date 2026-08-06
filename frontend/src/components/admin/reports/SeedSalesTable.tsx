"use client";

import {
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useGetFarmerGrowthReportQuery } from "@/src/redux/api/reportApi";

export default function FarmerGrowthChart() {
  const {
    data,
    isLoading,
    isError,
  } = useGetFarmerGrowthReportQuery();

  if (isLoading) {
    return (
      <Stack
         sx={{ alignItems:"center",
        py:5}}
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (isError || !data?.growth) {
    return (
      <Typography color="error">
        Failed to load farmer growth report.
      </Typography>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
        sx={{   fontWeight:700,
          mb:3}}
        >
          Farmer Growth
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart
            data={data.growth}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="farmers"
              stroke="#2E7D32"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}