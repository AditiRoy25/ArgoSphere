"use client";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import {
  useGetMyReportsQuery,
} from "@/src/redux/api/ngoApi";

import NgoReportCards from "@/src/components/ngo/NgoReportCards";

export default function NgoReportsPage() {

  const {
    data,
    isLoading,
    isError,
  } = useGetMyReportsQuery();

  const reports =
    data?.reports ??
    [];

  const summary =
    data?.summary ?? {
      totalReports: 0,
      monthlyReports: 0,
      beneficiaries: 0,
      approvedSchemes: 0,
      performanceScore: 0,
    };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Report",
      flex: 1.5,
      minWidth: 220,
    },

    {
      field: "type",
      headerName: "Type",
      width: 160,
    },

    {
      field: "createdAt",
      headerName: "Created",
      width: 180,

      renderCell: (params) =>
        new Date(
          params.value
        ).toLocaleDateString(),
    },

    {
      field: "status",
      headerName: "Status",
      width: 160,

      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value ===
            "Approved"
              ? "success"
              : params.value ===
                "Rejected"
              ? "error"
              : "warning"
          }
          size="small"
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error">
          Failed to load reports.
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={4}>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          NGO Reports
        </Typography>

        <NgoReportCards
          totalReports={
            summary.totalReports
          }
          monthlyReports={
            summary.monthlyReports
          }
          beneficiaries={
            summary.beneficiaries
          }
          approvedSchemes={
            summary.approvedSchemes
          }
          performanceScore={
            summary.performanceScore
          }
        />

        <Card>
          <CardContent>

            <Typography
              variant="h6"
              mb={3}
            >
              Report History
            </Typography>

            <DataGrid
              autoHeight
              rows={reports}
              columns={columns}
              getRowId={(row) =>
                row._id
              }
              pageSizeOptions={[
                5,
                10,
                20,
              ]}
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel:
                    {
                      page: 0,
                      pageSize: 10,
                    },
                },
              }}
            />

          </CardContent>
        </Card>

      </Stack>
    </Container>
  );
}