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

import { useGetFertilizerReportQuery } from "@/src/redux/api/reportApi";

export default function FertilizerReportTable() {
  const {
    data,
    isLoading,
    isError,
  } = useGetFertilizerReportQuery();

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "fertilizer",
        headerName: "Fertilizer",
        flex: 1,
        minWidth: 220,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 1,
        minWidth: 150,
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
        Failed to load fertilizer report.
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
          Fertilizer Report
        </Typography>

        <DataGrid
          autoHeight
          rows={data?.report ?? []}
          columns={columns}
          getRowId={(row) => row.fertilizer}
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