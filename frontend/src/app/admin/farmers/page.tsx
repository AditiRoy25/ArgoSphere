"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  Alert,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  useGetFarmersQuery,
} from "@/src/redux/api/farmerApi";

import {
  useBlockUserMutation,
  useUnblockUserMutation,
} from "@/src/redux/api/adminApi";

import type {
  IFarmer,
} from "@/src/types/farmer.types";


// ======================================
// SNACKBAR TYPE
// ======================================

interface SnackbarState {
  open: boolean;
  message: string;
  severity:
    | "success"
    | "error"
    | "warning"
    | "info";
}


// ======================================
// FARMERS PAGE
// ======================================

export default function FarmersPage() {

  // ======================================
  // PAGINATION
  // ======================================

  const [
    paginationModel,
    setPaginationModel,
  ] =
    useState<GridPaginationModel>({
      page: 0,
      pageSize: 10,
    });


  // ======================================
  // CURRENT ACTION USER
  // ======================================

  const [
    actionUserId,
    setActionUserId,
  ] = useState<string | null>(
    null
  );

  const [blockedStateByUserId, setBlockedStateByUserId] =
    useState<Record<string, boolean>>({});


  // ======================================
  // SNACKBAR
  // ======================================

  const [
    snackbar,
    setSnackbar,
  ] =
    useState<SnackbarState>({
      open: false,
      message: "",
      severity: "success",
    });


  // ======================================
  // GET FARMERS
  // farmerApi
  // ======================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetFarmersQuery({
    page:
      paginationModel.page + 1,

    limit:
      paginationModel.pageSize,
  });


  // ======================================
  // ADMIN BLOCK USER
  // adminApi
  // ======================================

  const [
    blockUser,
    {
      isLoading:
        isBlocking,
    },
  ] =
    useBlockUserMutation();


  // ======================================
  // ADMIN UNBLOCK USER
  // adminApi
  // ======================================

  const [
    unblockUser,
    {
      isLoading:
        isUnblocking,
    },
  ] =
    useUnblockUserMutation();


  // ======================================
  // FARMERS DATA
  // ======================================

  const farmers: IFarmer[] =
    (data?.data ?? []).map((farmer) => ({
      ...farmer,
      isBlocked:
        blockedStateByUserId[farmer._id] ??
        farmer.isBlocked,
    }));


  // ======================================
  // TOTAL
  // ======================================

  const total =
    data?.total ?? 0;

  const getImageUrl = (image?: string) => {
    if (!image || image.startsWith("http")) {
      return image;
    }

    return `${process.env.NEXT_PUBLIC_API_URL}${image}`;
  };


  // ======================================
  // BLOCK FARMER
  // ======================================

  const handleBlock = async (
    id: string
  ) => {

    try {

      setActionUserId(id);

      await blockUser(
        id
      ).unwrap();

      setBlockedStateByUserId((current) => ({
        ...current,
        [id]: true,
      }));

      setSnackbar({
        open: true,

        message:
          "Farmer blocked successfully",

        severity:
          "success",
      });

    } catch (error) {

      console.error(
        "BLOCK FARMER ERROR:",
        error
      );

      setSnackbar({
        open: true,

        message:
          "Failed to block farmer",

        severity:
          "error",
      });

    } finally {

      setActionUserId(
        null
      );

    }
  };


  // ======================================
  // UNBLOCK FARMER
  // ======================================

  const handleUnblock =
    async (
      id: string
    ) => {

      try {

        setActionUserId(
          id
        );

        await unblockUser(
          id
        ).unwrap();

        setBlockedStateByUserId((current) => ({
          ...current,
          [id]: false,
        }));

        setSnackbar({
          open: true,

          message:
            "Farmer unblocked successfully",

          severity:
            "success",
        });

      } catch (error) {

        console.error(
          "UNBLOCK FARMER ERROR:",
          error
        );

        setSnackbar({
          open: true,

          message:
            "Failed to unblock farmer",

          severity:
            "error",
        });

      } finally {

        setActionUserId(
          null
        );

      }
    };


  // ======================================
  // COLUMNS
  // ======================================

  const columns:
    GridColDef<IFarmer>[] =
    [

      // ==============================
      // IMAGE
      // ==============================

      {
        field:
          "profileImage",

        headerName:
          "Image",

        width: 90,

        sortable:
          false,

        renderCell: ({
          row,
        }) => (

          <Avatar
            src={
              getImageUrl(
                row.profileImage ??
                row.image
              ) ||
              ""
            }
            alt={
              row.name
            }
          >
            {row.name
              ?.charAt(0)
              ?.toUpperCase()}
          </Avatar>

        ),
      },


      // ==============================
      // NAME
      // ==============================

      {
        field: "name",

        headerName:
          "Name",

        flex: 1,

        minWidth: 140,
      },


      // ==============================
      // EMAIL
      // ==============================

      {
        field: "email",

        headerName:
          "Email",

        flex: 1.3,

        minWidth: 190,
      },


      // ==============================
      // PHONE
      // ==============================

      {
        field: "phone",

        headerName:
          "Phone",

        flex: 1,

        minWidth: 130,
      },


      // ==============================
      // VERIFIED
      // ==============================

      {
        field:
          "isVerified",

        headerName:
          "Verified",

        width: 120,

        renderCell: ({
          value,
        }) => (

          <Chip
            label={
              value
                ? "Verified"
                : "Pending"
            }

            color={
              value
                ? "success"
                : "warning"
            }

            size="small"
          />

        ),
      },


      // ==============================
      // STATUS
      // ==============================

      {
        field:
          "isBlocked",

        headerName:
          "Status",

        width: 120,

        renderCell: ({
          value,
        }) => (

          <Chip
            label={
              value
                ? "Blocked"
                : "Active"
            }

            color={
              value
                ? "error"
                : "success"
            }

            size="small"
          />

        ),
      },


      // ==============================
      // ACTIONS
      // ==============================

      {
        field:
          "actions",

        headerName:
          "Actions",

        width: 160,

        sortable:
          false,

        filterable:
          false,

        renderCell: ({
          row,
        }) => {

          const processing =
            actionUserId ===
              row._id &&
            (
              isBlocking ||
              isUnblocking
            );


          return (

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >

              {/* =====================
                  VIEW
              ===================== */}

              <Tooltip
                title="View Farmer"
              >

                <IconButton
                  component={
                    Link
                  }

                  href={
                    `/admin/farmers/${row._id}`
                  }

                  color="primary"
                  size="small"
                >

                  <VisibilityIcon />

                </IconButton>

              </Tooltip>


              {/* =====================
                  LOADING
              ===================== */}

              {processing ? (

                <Box
                  sx={{
                    width: 34,
                    height: 34,

                    display:
                      "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",
                  }}
                >

                  <CircularProgress
                    size={20}
                  />

                </Box>

              ) : row.isBlocked ? (

                // =====================
                // UNBLOCK
                // =====================

                <Tooltip
                  title="Unblock Farmer"
                >

                  <IconButton
                    color="success"

                    size="small"

                    onClick={() =>
                      handleUnblock(
                        row._id
                      )
                    }
                  >

                    <CheckCircleIcon />

                  </IconButton>

                </Tooltip>

              ) : (

                // =====================
                // BLOCK
                // =====================

                <Tooltip
                  title="Block Farmer"
                >

                  <IconButton
                    color="error"

                    size="small"

                    onClick={() =>
                      handleBlock(
                        row._id
                      )
                    }
                  >

                    <BlockIcon />

                  </IconButton>

                </Tooltip>

              )}

            </Stack>

          );
        },
      },
    ];


  // ======================================
  // FIRST LOADING
  // ======================================

  if (
    isLoading &&
    farmers.length === 0
  ) {

    return (

      <Box
        sx={{
          minHeight: 400,

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >

        <CircularProgress />

      </Box>

    );
  }


  // ======================================
  // ERROR
  // ======================================

  if (isError) {

    return (

      <Container
        maxWidth="lg"
        sx={{
          py: 4,
        }}
      >

        <Alert
          severity="error"
        >
          Failed to load
          farmers.
        </Alert>

      </Container>

    );
  }


  // ======================================
  // UI
  // ======================================

  return (

    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >

      <Stack
        spacing={3}
      >

        {/* =========================
            PAGE HEADER
        ========================= */}

        <Stack
          direction="row"

          justifyContent=
            "space-between"

          alignItems=
            "center"
        >

          <Box>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              Farmers
            </Typography>

            <Typography
              variant="body2"
              color=
                "text.secondary"
            >
              Manage registered
              farmers
            </Typography>

          </Box>


          {/* REFRESH */}

          <Tooltip
            title="Refresh"
          >

            <span>

              <IconButton
                disabled={
                  isFetching
                }

                onClick={() =>
                  refetch()
                }
              >

                {isFetching ? (

                  <CircularProgress
                    size={22}
                  />

                ) : (

                  <RefreshIcon />

                )}

              </IconButton>

            </span>

          </Tooltip>

        </Stack>


        {/* =========================
            FARMER TABLE
        ========================= */}

        <Paper
          sx={{
            p: 2,

            borderRadius: 3,
          }}
        >

          <DataGrid
            autoHeight

            rows={
              farmers
            }

            columns={
              columns
            }

            getRowId={(
              row
            ) =>
              row._id
            }

            disableRowSelectionOnClick

            // =====================
            // SERVER PAGINATION
            // =====================

            paginationMode=
              "server"

            rowCount={
              total
            }

            paginationModel={
              paginationModel
            }

            onPaginationModelChange={
              (
                model
              ) =>
                setPaginationModel(
                  model
                )
            }

            pageSizeOptions={[
              10,
              20,
              50,
            ]}

            loading={
              isFetching
            }

            // =====================
            // STYLE
            // =====================

            sx={{
              border: 0,

              "& .MuiDataGrid-columnHeaders":
                {
                  fontWeight:
                    700,
                },
            }}
          />

        </Paper>

      </Stack>


      {/* =========================
          SNACKBAR
      ========================= */}

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

              open:
                false,
            })
          )
        }

        anchorOrigin={{
          vertical:
            "bottom",

          horizontal:
            "right",
        }}
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

                open:
                  false,
              })
            )
          }
        >

          {
            snackbar.message
          }

        </Alert>

      </Snackbar>

    </Container>

  );
}
