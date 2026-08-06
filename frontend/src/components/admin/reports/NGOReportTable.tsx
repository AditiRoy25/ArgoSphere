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

import { useGetNGOReportQuery } from "@/src/redux/api/reportApi";

export default function NGOReportTable() {
  const {
    data,
    isLoading,
    isError,
  } = useGetNGOReportQuery();

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "ngo",
        headerName: "NGO",
        flex: 1.5,
        minWidth: 220,
      },
      {
        field: "workshops",
        headerName: "Workshops",
        flex: 1,
        minWidth: 140,
      },
      {
        field: "farmersReached",
        headerName: "Farmers Reached",
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
        Failed to load NGO performance report.
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
          NGO Performance Report
        </Typography>

        <DataGrid
          autoHeight
          rows={data?.report ?? []}
          columns={columns}
          getRowId={(row) => row.ngo}
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