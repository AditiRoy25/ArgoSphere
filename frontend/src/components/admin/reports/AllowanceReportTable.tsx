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

import { useGetAllowanceReportQuery } from "@/src/redux/api/reportApi";

export default function AllowanceReportTable() {
  const {
    data,
    isLoading,
    isError,
  } = useGetAllowanceReportQuery();

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "scheme",
        headerName: "Scheme",
        flex: 2,
        minWidth: 220,
      },
      {
        field: "applications",
        headerName: "Applications",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "approved",
        headerName: "Approved",
        flex: 1,
        minWidth: 130,
      },
      {
        field: "rejected",
        headerName: "Rejected",
        flex: 1,
        minWidth: 130,
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
        Failed to load allowance report.
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
          Allowance Report
        </Typography>

        <DataGrid
          autoHeight
          rows={data?.report ?? []}
          columns={columns}
          getRowId={(row) => row.scheme}
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