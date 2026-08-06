"use client";

import * as React from "react";

import {
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";

import type {
  Order,
} from "@/src/types/marketplace.types";

interface OrdersTableProps {
  rows: Order[];

  loading?: boolean;

  onView: (
    order: Order
  ) => void;
}

export default function OrdersTable({
  rows,
  loading = false,
  onView,
}: OrdersTableProps) {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "_id",
        headerName: "Order ID",
        flex: 1.4,
        minWidth: 220,
      },

      {
        field: "customer",
        headerName: "Customer",
        flex: 1,
        minWidth: 180,

        valueGetter: (_, row) =>
          row.customer?.name ?? "-",
      },

      {
        field: "product",
        headerName: "Product",
        flex: 1.2,
        minWidth: 180,

        valueGetter: (_, row) =>
          row.product?.name ?? "-",
      },

      {
        field: "quantity",
        headerName: "Qty",
        width: 90,
      },

      {
        field: "totalPrice",
        headerName: "Total",
        width: 120,

        renderCell: (params) =>
          `₹${params.value}`,
      },

      {
        field: "status",
        headerName: "Status",
        width: 140,

        renderCell: (params) => (
          <Chip
            size="small"
            label={params.value}
            color={
              params.value === "Delivered"
                ? "success"
                : params.value === "Pending"
                ? "warning"
                : "info"
            }
          />
        ),
      },

      {
        field: "createdAt",
        headerName: "Date",
        width: 140,

        valueFormatter: (value) =>
          new Date(
            value as string
          ).toLocaleDateString(),
      },

      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        sortable: false,

        renderCell: (params) => (
          <Tooltip title="View">
            <IconButton
              color="primary"
              onClick={() =>
                onView(params.row)
              }
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [onView]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[
          5,
          10,
          20,
          50,
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
      />
    </Box>
  );
}