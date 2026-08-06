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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type {
  Product,
} from "@/src/types/marketplace.types";

interface ProductTableProps {
  rows: Product[];

  loading?: boolean;

  onView: (
    product: Product
  ) => void;

  onEdit: (
    product: Product
  ) => void;

  onDelete: (
    product: Product
  ) => void;
}

export default function ProductTable({
  rows,
  loading = false,
  onView,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 90,

        sortable: false,

        renderCell: (params) => (
          <Box
            component="img"
            src={params.value}
            alt={params.row.name}
            sx={{
              width: 50,
              height: 50,
              borderRadius: 1,
              objectFit: "cover",
              mt: 0.5,
            }}
          />
        ),
      },

      {
        field: "name",
        headerName: "Product",
        flex: 1.5,
        minWidth: 220,
      },

      {
        field: "category",
        headerName: "Category",
        flex: 1,
        minWidth: 140,
      },

      {
        field: "price",
        headerName: "Price",
        width: 120,

        renderCell: (params) =>
          `₹${params.value}`,
      },

      {
        field: "stock",
        headerName: "Stock",
        width: 110,
      },

      {
        field: "status",
        headerName: "Status",
        width: 120,

        renderCell: (params) => (
          <Chip
            size="small"
            label={params.value}
            color={
              params.value === "Available"
                ? "success"
                : "error"
            }
          />
        ),
      },

      {
        field: "actions",
        headerName: "Actions",
        width: 150,

        sortable: false,

        filterable: false,

        renderCell: (params) => (
          <>
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

            <Tooltip title="Edit">
              <IconButton
                color="warning"
                onClick={() =>
                  onEdit(params.row)
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() =>
                  onDelete(params.row)
                }
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    [onView, onEdit, onDelete]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row._id}
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