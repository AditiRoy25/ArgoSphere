"use client";

import {
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import {
  useGetAllOrdersQuery,
} from "../../../../redux/api/maketplaceApi";

export default function OrdersPage() {
  const {
    data,
    isLoading,
  } = useGetAllOrdersQuery();

  if (isLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          py: 6,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "Order ID",
      flex: 1,
    },
    {
      field: "farmer",
      headerName: "Farmer",
      flex: 1,
      valueGetter: (_, row) =>
        row.farmer?.name ??
        row.farmer,
    },
    {
      field: "totalAmount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (value) =>
        `₹${value}`,
    },
    {
      field: "paymentStatus",
      headerName: "Payment",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={
            params.value
          }
          color={
            params.value ===
            "paid"
              ? "success"
              : "warning"
          }
          size="small"
        />
      ),
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={
            params.value
          }
          color={
            params.value ===
            "delivered"
              ? "success"
              : params.value ===
                "cancelled"
              ? "error"
              : "info"
          }
          size="small"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      valueFormatter: (value) =>
        new Date(
          value
        ).toLocaleDateString(),
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={3}>
        <Typography
          variant="h4"
        sx={{ fontWeight:700}}
        >
          Marketplace Orders
        </Typography>

        <Paper
          sx={{
            height: 650,
          }}
        >
          <DataGrid
            rows={
              data?.orders ??
              []
            }
            columns={columns}
            getRowId={(row) =>
              row._id
            }
            pageSizeOptions={[
              10,
              20,
              50,
            ]}
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
        </Paper>
      </Stack>
    </Container>
  );
}