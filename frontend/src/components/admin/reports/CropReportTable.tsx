"use client";

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

import { useMemo } from "react";

import { useGetCropReportQuery } from "@/src/redux/api/reportApi";

export default function CropReportTable() {
  const {
    data,
    isLoading,
    isError,
  } = useGetCropReportQuery();

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "crop",
        headerName: "Crop",
        flex: 1,
        minWidth: 180,
      },
      {
        field: "farms",
        headerName: "Total Farms",
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
        Failed to load crop report.
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
          Crop Report
        </Typography>

        <DataGrid
          autoHeight
          rows={data?.report ?? []}
          columns={columns}
          getRowId={(row) => row.crop}
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