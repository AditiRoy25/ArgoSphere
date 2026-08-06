"use client";

import { useMemo } from "react";

import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import { useGetWeatherReportQuery } from "@/src/redux/api/reportApi";

export default function WeatherReportTable() {
  const {
    data,
    isLoading,
    isError,
  } = useGetWeatherReportQuery();

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "district",
        headerName: "District",
        flex: 2,
        minWidth: 220,
      },
      {
        field: "alerts",
        headerName: "Weather Alerts",
        flex: 1,
        minWidth: 180,
      },
    ],
    []
  );

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

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load weather report.
      </Alert>
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
          Weather Report
        </Typography>

        <DataGrid
          autoHeight
          rows={data?.report ?? []}
          columns={columns}
          getRowId={(row) => row.district}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 5,
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}