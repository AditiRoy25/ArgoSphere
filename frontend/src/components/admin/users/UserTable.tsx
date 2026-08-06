"use client";

import { useState } from "react";

import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const rows = [
  {
    id: 1,
    name: "Rahul Saha",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    role: "Farmer",
    status: "Active",
    joined: "29 Jul 2026",
  },
  {
    id: 2,
    name: "Anita Roy",
    email: "anita@gmail.com",
    phone: "+91 9876543211",
    role: "NGO",
    status: "Pending",
    joined: "28 Jul 2026",
  },
  {
    id: 3,
    name: "Amit Das",
    email: "amit@gmail.com",
    phone: "+91 9876543212",
    role: "Officer",
    status: "Blocked",
    joined: "27 Jul 2026",
  },
];

export default function UserTable() {
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "User",
      flex: 1.8,
      renderCell: (params) => (
        <Stack
          
          sx={{ height: "100%",
            direction:"row",
          spacing:2,
          alignItems:"center"
           }}
        >
          <Avatar>
            {params.row.name[0]}
          </Avatar>

          <Box>
            <Typography sx={{fontWeight:600}}>
              {params.row.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {params.row.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value}
          color={
            params.value === "Active"
              ? "success"
              : params.value === "Pending"
              ? "warning"
              : "error"
          }
        />
      ),
    },

    {
      field: "joined",
      headerName: "Joined",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      width: 90,
      sortable: false,
      renderCell: () => (
        <>
          <IconButton
            onClick={handleOpen}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <VisibilityOutlinedIcon
                fontSize="small"
                sx={{ mr: 1 }}
              />
              View
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <EditOutlinedIcon
                fontSize="small"
                sx={{ mr: 1 }}
              />
              Edit
            </MenuItem>

            <MenuItem
              onClick={handleClose}
              sx={{ color: "error.main" }}
            >
              <DeleteOutlineOutlinedIcon
                fontSize="small"
                sx={{ mr: 1 }}
              />
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        disableRowSelectionOnClick
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8fafc",
            fontWeight: 700,
          },
        }}
      />
    </Paper>
  );
}