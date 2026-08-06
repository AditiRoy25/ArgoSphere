
"use client";

import { useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
} from "../../../redux/api/adminApi";

import AddUserDialog from "../../../components/admin/users/AddUserDialog";

import EditUserDialog from "../../../components/admin/users/dialogs/EditUserDialog";
import DeleteUserDialog from "../../../components/admin/users/dialogs/DeleteUserDialog";

import type { IUser } from "../../../types/user.types";

export default function AdminUsersPage() {
  // =====================================
  // PAGINATION
  // =====================================

  const [page, setPage] =
    useState(1);

  const [limit, setLimit] =
    useState(10);

  // =====================================
  // FILTER
  // =====================================

  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState("");

  // =====================================
  // DIALOG
  // =====================================

  const [openAdd, setOpenAdd] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<IUser | null>(
    null
  );

  // =====================================
  // SNACKBAR
  // =====================================

  const [
    snackbar,
    setSnackbar,
  ] = useState<{
    open: boolean;
    message: string;
    severity:
      | "success"
      | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // =====================================
  // GET USERS
  // =====================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetUsersQuery({
    page,
    limit,
    search,
    role,
  });

  // =====================================
  // MUTATIONS
  // =====================================

  const [
    blockUser,
    {
      isLoading:
        isBlocking,
    },
  ] =
    useBlockUserMutation();

  const [
    unblockUser,
    {
      isLoading:
        isUnblocking,
    },
  ] =
    useUnblockUserMutation();

  const [deleteUser, { isLoading: isDeleting }] =
    useDeleteUserMutation();

  // =====================================
  // RESPONSE DATA
  // =====================================

  const users =
    data?.data ?? [];

  const total =
    data?.pagination?.total ?? 0;

  const getImageUrl = (image?: string) => {
    if (!image || image.startsWith("http")) {
      return image;
    }

    return `${process.env.NEXT_PUBLIC_API_URL}${image}`;
  };

  // =====================================
  // EDIT USER
  // =====================================

  const handleEdit = (
    user: IUser
  ) => {
    setSelectedUser(user);

    setOpenEdit(true);
  };

  const handleDelete = (user: IUser) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser?._id) return;

    try {
      await deleteUser(selectedUser._id).unwrap();
      setOpenDelete(false);
      setSelectedUser(null);
      setSnackbar({ open: true, message: "User deleted successfully", severity: "success" });
    } catch (error) {
      console.error("Delete user error:", error);
      setSnackbar({ open: true, message: "Failed to delete user", severity: "error" });
    }
  };

  // =====================================
  // BLOCK USER
  // =====================================

  const handleBlock = async (
    id: string
  ) => {
    try {
      await blockUser(
        id
      ).unwrap();

      setSnackbar({
        open: true,
        message:
          "User blocked successfully",
        severity:
          "success",
      });
    } catch (error) {
      console.error(
        "Block user error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          "Failed to block user",
        severity:
          "error",
      });
    }
  };

  // =====================================
  // UNBLOCK USER
  // =====================================

  const handleUnblock =
    async (
      id: string
    ) => {
      try {
        await unblockUser(
          id
        ).unwrap();

        setSnackbar({
          open: true,
          message:
            "User unblocked successfully",
          severity:
            "success",
        });
      } catch (error) {
        console.error(
          "Unblock user error:",
          error
        );

        setSnackbar({
          open: true,
          message:
            "Failed to unblock user",
          severity:
            "error",
        });
      }
    };

  // =====================================
  // COLUMNS
  // =====================================

  const columns: GridColDef<IUser>[] =
    [
      // ==========================
      // IMAGE
      // ==========================

      {
        field: "image",

        headerName: "Image",

        width: 80,

        sortable: false,

        renderCell: (
          params
        ) => (
          <Avatar
            src={
              getImageUrl(params.row.image) || ""
            }
            alt={
              params.row
                .name
            }
          >
            {params.row.name
              ?.charAt(0)
              .toUpperCase()}
          </Avatar>
        ),
      },

      // ==========================
      // NAME
      // ==========================

      {
        field: "name",

        headerName: "Name",

        minWidth: 160,

        flex: 1,
      },

      // ==========================
      // EMAIL
      // ==========================

      {
        field: "email",

        headerName: "Email",

        minWidth: 220,

        flex: 1.3,
      },

      // ==========================
      // PHONE
      // ==========================

      {
        field: "phone",

        headerName: "Phone",

        minWidth: 140,

        flex: 1,
      },

      // ==========================
      // ROLE
      // ==========================

      {
        field: "role",

        headerName: "Role",

        width: 120,

        renderCell: (
          params
        ) => (
          <Chip
            label={
              params.value ||
              "-"
            }
            color="primary"
            size="small"
            variant="outlined"
            sx={{
              textTransform:
                "capitalize",
            }}
          />
        ),
      },

      // ==========================
      // VERIFIED
      // ==========================

      {
        field:
          "isVerified",

        headerName:
          "Verified",

        width: 120,

        renderCell: (
          params
        ) => (
          <Chip
            label={
              params.value
                ? "Verified"
                : "Pending"
            }
            color={
              params.value
                ? "success"
                : "warning"
            }
            size="small"
          />
        ),
      },

      // ==========================
      // STATUS
      // ==========================

      {
        field:
          "isBlocked",

        headerName:
          "Status",

        width: 120,

        renderCell: (
          params
        ) => (
          <Chip
            label={
              params.value
                ? "Blocked"
                : "Active"
            }
            color={
              params.value
                ? "error"
                : "success"
            }
            size="small"
          />
        ),
      },

      // ==========================
      // ACTIONS
      // ==========================

      {
        field: "actions",

        headerName:
          "Actions",

        width: 150,

        sortable: false,

        filterable: false,

        renderCell: ({
          row,
        }) => (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
          >
            {/* EDIT */}

            <Tooltip title="Edit User">
              <IconButton
                color="primary"
                size="small"
                onClick={() =>
                  handleEdit(
                    row
                  )
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete User">
              <IconButton
                color="error"
                size="small"
                onClick={() => handleDelete(row)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            {/* BLOCK / UNBLOCK */}

            {row.isBlocked ? (
              <Tooltip title="Unblock User">
                <span>
                  <IconButton
                    color="success"
                    size="small"
                    disabled={
                      isUnblocking
                    }
                    onClick={() =>
                      handleUnblock(
                        row._id
                      )
                    }
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </span>
              </Tooltip>
            ) : (
              <Tooltip title="Block User">
                <span>
                  <IconButton
                    color="warning"
                    size="small"
                    disabled={
                      isBlocking
                    }
                    onClick={() =>
                      handleBlock(
                        row._id
                      )
                    }
                  >
                    <BlockIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}
          </Stack>
        ),
      },
    ];

  // =====================================
  // LOADING
  // =====================================

  if (
    isLoading
  ) {
    return (
      <Box
        sx={{
          minHeight:
            300,

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (isError) {
    console.error(
      "Get users error:",
      error
    );

    return (
      <Alert
        severity="error"
        action={
          <Button
            color="inherit"
            onClick={() =>
              refetch()
            }
          >
            Retry
          </Button>
        }
      >
        Failed to load
        users.
      </Alert>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "stretch",
            sm: "center",
          }}
          spacing={2}
          mb={3}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              Users
              Management
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Manage all
              AgroSphere
              users
            </Typography>
          </Box>

          <Button
            startIcon={
              <AddIcon />
            }
            variant="contained"
            onClick={() =>
              setOpenAdd(
                true
              )
            }
          >
            Add User
          </Button>
        </Stack>

        {/* ========================= */}
        {/* FILTER */}
        {/* ========================= */}

        <Grid
          container
          spacing={2}
          sx={{
            mb: 3,
          }}
        >
          {/* SEARCH */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name or email..."
              value={search}
              onChange={(
                e
              ) => {
                setSearch(
                  e.target
                    .value
                );

                setPage(
                  1
                );
              }}
            />
          </Grid>

          {/* ROLE */}

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <TextField
              fullWidth
              select
              size="small"
              label="Role"
              value={role}
              onChange={(
                e
              ) => {
                setRole(
                  e.target
                    .value
                );

                setPage(
                  1
                );
              }}
            >
              <MenuItem value="">
                All Roles
              </MenuItem>

              <MenuItem value="farmer">
                Farmer
              </MenuItem>

              <MenuItem value="ngo">
                NGO
              </MenuItem>

              <MenuItem value="officer">
                Officer
              </MenuItem>

              <MenuItem value="ministry">
                Ministry
              </MenuItem>

              <MenuItem value="admin">
                Admin
              </MenuItem>
            </TextField>
          </Grid>

          {/* RESET */}

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              sx={{
                height: 40,
              }}
              onClick={() => {
                setSearch(
                  ""
                );

                setRole(
                  ""
                );

                setPage(
                  1
                );
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>

        {/* ========================= */}
        {/* FETCHING */}
        {/* ========================= */}

        {isFetching && (
          <Box
            sx={{
              mb: 2,
              display:
                "flex",
              alignItems:
                "center",
              gap: 1,
            }}
          >
            <CircularProgress
              size={18}
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Updating
              users...
            </Typography>
          </Box>
        )}

        {/* ========================= */}
        {/* DATA GRID */}
        {/* ========================= */}

        <Box
          sx={{
            width: "100%",
          }}
        >
          <DataGrid
            rows={users}
            columns={
              columns
            }
            getRowId={(
              row
            ) => row._id}
            rowCount={
              total
            }
            paginationMode="server"
            paginationModel={{
              page:
                page - 1,

              pageSize:
                limit,
            }}
            onPaginationModelChange={(
              model
            ) => {
              setPage(
                model.page +
                  1
              );

              setLimit(
                model.pageSize
              );
            }}
            pageSizeOptions={[
              5,
              10,
              20,
              50,
            ]}
            loading={
              isFetching
            }
            disableRowSelectionOnClick
            sx={{
              minHeight:
                450,

              borderRadius:
                2,

              "& .MuiDataGrid-columnHeaders":
                {
                  fontWeight:
                    700,
                },
            }}
          />
        </Box>
      </Paper>

      {/* ================================= */}
      {/* ADD USER */}
      {/* ================================= */}

      <AddUserDialog
        open={openAdd}
        onClose={() =>
          setOpenAdd(
            false
          )
        }
      />

      {/* ================================= */}
      {/* EDIT USER */}
      {/* ================================= */}

      <EditUserDialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(
            false
          );

          setSelectedUser(
            null
          );
        }}
        user={
          selectedUser ??
          undefined
        }
      />

      <DeleteUserDialog
        open={openDelete}
        loading={isDeleting}
        userName={selectedUser?.name}
        onClose={() => {
          if (!isDeleting) {
            setOpenDelete(false);
            setSelectedUser(null);
          }
        }}
        onDelete={confirmDelete}
      />

      {/* ================================= */}
      {/* MESSAGE */}
      {/* ================================= */}

      <Snackbar
        open={
          snackbar.open
        }
        autoHideDuration={
          3000
        }
        onClose={() =>
          setSnackbar(
            (
              previous
            ) => ({
              ...previous,
              open: false,
            })
          )
        }
      >
        <Alert
          severity={
            snackbar.severity
          }
          variant="filled"
          onClose={() =>
            setSnackbar(
              (
                previous
              ) => ({
                ...previous,
                open: false,
              })
            )
          }
        >
          {
            snackbar.message
          }
        </Alert>
      </Snackbar>
    </Box>
  );
}





// / "use client";

// import { useState } from "react";

// import {
//   Box,
//   Paper,
//   Stack,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Chip,
//   Avatar,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";

// import Grid from "@mui/material/Grid";

// import {
//   DataGrid,
//   GridColDef,
// } from "@mui/x-data-grid";

// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import BlockIcon from "@mui/icons-material/Block";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import {
//   useGetUsersQuery,
//   // useDeleteUserMutation,
//   useBlockUserMutation,
//   useUnblockUserMutation,
// } from "../../../redux/api/adminApi";

// import AddUserDialog from "../../../components/admin/users/AddUserDialog";
// import EditUserDialog from "../../../components/admin/users/dialogs/EditUserDialog";

// import type { IUser } from "../../../types/user.types";

// export default function AdminUsersPage() {
//   const [page, setPage] = useState(1);

//   const [limit] = useState(10);

//   const [search, setSearch] = useState("");

//   const [role, setRole] = useState("");

//   const [openAdd, setOpenAdd] =
//     useState(false);

//   const [openEdit, setOpenEdit] =
//     useState(false);

//   const [selectedUser, setSelectedUser] =
//     useState<IUser | null>(null);

//   const {
//     data,
//     isLoading,
//   } = useGetUsersQuery({
//     page,
//     limit,
//     search,
//     role,
//   });

//   const [deleteUser] =
//     useDeleteUserMutation();

//   const [blockUser] =
//     useBlockUserMutation();

//   const [unblockUser] =
//     useUnblockUserMutation();

//   const columns: GridColDef[] = [
//     {
//       field: "image",
//       headerName: "Image",
//       width: 80,
//       renderCell: (params) => (
//         <Avatar src={params.row.image} />
//       ),
//     },

//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//     },

//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1.3,
//     },

//     {
//       field: "phone",
//       headerName: "Phone",
//       flex: 1,
//     },

//     {
//       field: "role",
//       headerName: "Role",
//       width: 120,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           color="primary"
//           size="small"
//         />
//       ),
//     },

//     {
//       field: "isVerified",
//       headerName: "Verified",
//       width: 120,
//       renderCell: (params) => (
//         <Chip
//           label={
//             params.value
//               ? "Verified"
//               : "Pending"
//           }
//           color={
//             params.value
//               ? "success"
//               : "warning"
//           }
//           size="small"
//         />
//       ),
//     },

//     {
//       field: "isBlocked",
//       headerName: "Status",
//       width: 120,
//       renderCell: (params) => (
//         <Chip
//           label={
//             params.value
//               ? "Blocked"
//               : "Active"
//           }
//           color={
//             params.value
//               ? "error"
//               : "success"
//           }
//           size="small"
//         />
//       ),
//     },

//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 220,
//       sortable: false,

//       renderCell: ({ row }) => (
//         <Stack
//           direction="row"
//           spacing={1}
//         >
//           <IconButton
//             color="primary"
//             onClick={() => {
//               setSelectedUser(row);
//               setOpenEdit(true);
//             }}
//           >
//             <EditIcon />
//           </IconButton>

//           <IconButton
//             color="error"
//             onClick={() =>
//               deleteUser(row._id)
//             }
//           >
//             <DeleteIcon />
//           </IconButton>

//           {row.isBlocked ? (
//             <IconButton
//               color="success"
//               onClick={() =>
//                 unblockUser(row._id)
//               }
//             >
//               <CheckCircleIcon />
//             </IconButton>
//           ) : (
//             <IconButton
//               color="warning"
//               onClick={() =>
//                 blockUser(row._id)
//               }
//             >
//               <BlockIcon />
//             </IconButton>
//           )}
//         </Stack>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       <Paper
//         sx={{
//           p: 3,
//           borderRadius: 3,
//         }}
//       >
//         <Stack
//         sx={{  direction:"row",
//           justifyContent:"space-between",
//           mb:3}}
//         >
//           <Typography variant="h5">
//             Users Management
//           </Typography>

//           <Button
//             startIcon={<AddIcon />}
//             variant="contained"
//             onClick={() =>
//               setOpenAdd(true)
//             }
//           >
//             Add User
//           </Button>
//         </Stack>

//         <Grid
//           container
//         sx={{  spacing:2,
//           mb:3}}
//         >
//           <Grid
//             size={{
//               xs: 12,
//               md: 6,
//             }}
//           >
//             <TextField
//               fullWidth
//               placeholder="Search user..."
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//             />
//           </Grid>

//           <Grid
//             size={{
//               xs: 12,
//               md: 3,
//             }}
//           >
//             <TextField
//               fullWidth
//               select
//               label="Role"
//               value={role}
//               onChange={(e) =>
//                 setRole(
//                   e.target.value
//                 )
//               }
//             >
//               <MenuItem value="">
//                 All
//               </MenuItem>

//               <MenuItem value="farmer">
//                 Farmer
//               </MenuItem>

//               <MenuItem value="ngo">
//                 NGO
//               </MenuItem>

//               <MenuItem value="officer">
//                 Officer
//               </MenuItem>

//               <MenuItem value="ministry">
//                 Ministry
//               </MenuItem>

//               <MenuItem value="admin">
//                 Admin
//               </MenuItem>
//             </TextField>
//           </Grid>
//         </Grid>

//         {isLoading ? (
//           <CircularProgress />
//         ) : (
//           <DataGrid
//             autoHeight
//             rows={data?.data ?? []}
//             columns={columns}
//             getRowId={(row) =>
//               row._id
//             }
//             rowCount={
//               data?.total ?? 0
//             }
//             paginationMode="server"
//             paginationModel={{
//               page: page - 1,
//               pageSize: limit,
//             }}
//             onPaginationModelChange={(
//               model
//             ) =>
//               setPage(
//                 model.page + 1
//               )
//             }
//           />
//         )}
//       </Paper>

//       <AddUserDialog
//         open={openAdd}
//         onClose={() =>
//           setOpenAdd(false)
//         }
//       />

//       <EditUserDialog
//         open={openEdit}
//         onClose={() =>
//           setOpenEdit(false)
//         }
//         user={selectedUser ?? undefined}
//       />
//     </Box>
//   );
// }
