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

import { GovernmentScheme } from "../../../types/scheme";

interface SchemeTableProps {
  rows: GovernmentScheme[];

  loading?: boolean;

  onView: (scheme: GovernmentScheme) => void;

  onEdit: (scheme: GovernmentScheme) => void;

  onDelete: (scheme: GovernmentScheme) => void;
}

export default function SchemeTable({
  rows,
  loading = false,
  onView,
  onEdit,
  onDelete,
}: SchemeTableProps) {
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "title",
        headerName: "Title",
        flex: 1.5,
        minWidth: 220,
      },

      {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        minWidth: 120,
        renderCell: (params) =>
          `₹${params.value}`,
      },

      {
        field: "eligibility",
        headerName: "Eligibility",
        flex: 1.5,
        minWidth: 220,
      },

      {
        field: "lastDate",
        headerName: "Last Date",
        flex: 1,
        minWidth: 140,
        valueFormatter: (value) =>
          new Date(value).toLocaleDateString(),
      },

      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 120,

        renderCell: (params) => (
          <Chip
            label={params.value}
            color={
              params.value === "Active"
                ? "success"
                : "error"
            }
            size="small"
          />
        ),
      },

      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        filterable: false,
        width: 150,

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
        pageSizeOptions={[5, 10, 20, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}