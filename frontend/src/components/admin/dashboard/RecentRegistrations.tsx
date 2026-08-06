"use client";

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import type { IUser } from "../../../types/user.types";

interface Props {
  users?: IUser[];
}

export default function RecentRegistrations({
  users = [],
}: Props) {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "User",
      flex: 2,
      sortable: false,

      renderCell: ({ row }) => (
        <Stack
         sx={{ direction:"row",
          spacing:2,
          alignItems:"center",
          height:"100%"}}
        >
          <Avatar src={row.image}>
            {row.name?.charAt(0)}
          </Avatar>

          <Stack spacing={0}>
            <Typography
              variant="subtitle2"
              sx={{fontWeight:600}}
            >
              {row.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {row.email}
            </Typography>
          </Stack>
        </Stack>
      ),
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,

      renderCell: ({ value }) => (
        <Chip
          label={value}
          color="primary"
          size="small"
        />
      ),
    },

    {
      field: "isBlocked",
      headerName: "Status",
      flex: 1,

      renderCell: ({ value }) => (
        <Chip
          label={value ? "Blocked" : "Active"}
          color={value ? "error" : "success"}
          size="small"
        />
      ),
    },

    {
      field: "createdAt",
      headerName: "Registered",
      flex: 1.2,

      renderCell: ({ value }) =>
        value
          ? new Date(value).toLocaleDateString()
          : "-",
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
         sx={{ fontWeight:700,
          mb:3}}
        >
          Recent Registrations
        </Typography>

        <DataGrid
          autoHeight
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooter
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "grey.100",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}