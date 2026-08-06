"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import {
  useDeleteFarmMutation,
  useGetMyFarmsQuery,
} from "@/src/redux/api/farmApi";

// ==========================================
// FARMS PAGE
// ==========================================

export default function FarmsPage() {
  // ========================================
  // GET FARMS
  // ========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMyFarmsQuery();

  // ========================================
  // DELETE FARM
  // ========================================

  const [
    deleteFarm,
    { isLoading: isDeleting },
  ] = useDeleteFarmMutation();

  // ========================================
  // STATES
  // ========================================

  const [
    selectedFarmId,
    setSelectedFarmId,
  ] = useState<string | null>(null);

  const [
    deleteError,
    setDeleteError,
  ] = useState("");

  const farms = data?.farms ?? [];

  // ========================================
  // DELETE HANDLER
  // ========================================

  const handleDelete = async () => {
    if (!selectedFarmId) return;

    setDeleteError("");

    try {
      await deleteFarm(
        selectedFarmId
      ).unwrap();

      setSelectedFarmId(null);

      refetch();
    } catch (err) {
      console.error(
        "DELETE FARM ERROR:",
        err
      );

      const apiError = err as {
        data?: {
          message?: string;
        };
      };

      setDeleteError(
        apiError?.data?.message ||
          "Failed to delete farm."
      );
    }
  };

  // ========================================
  // UI
  // ========================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Container maxWidth="xl">

        {/* ==================================
            TOP HEADER
        ================================== */}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          spacing={2}
          mb={4}
        >
          <Box>
            <Button
              component={Link}
              href="/farmer/dashboard"
              color="success"
              startIcon={
                <ArrowBackIcon />
              }
              sx={{
                mb: 1,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Dashboard
            </Button>

            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                color: "#111827",
              }}
            >
              My Farms
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              Manage your registered farms,
              locations and soil information.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/farmer/farms/create"
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            sx={{
              height: 46,
              px: 3,
              borderRadius: 2.5,
              fontWeight: 700,
              textTransform: "none",
              boxShadow:
                "0 5px 15px rgba(22,163,74,.20)",
            }}
          >
            Add New Farm
          </Button>
        </Stack>

        {/* ==================================
            DELETE ERROR
        ================================== */}

        {deleteError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
            onClose={() =>
              setDeleteError("")
            }
          >
            {deleteError}
          </Alert>
        )}

        {/* ==================================
            API ERROR
        ================================== */}

        {isError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
            }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() =>
                  refetch()
                }
              >
                Retry
              </Button>
            }
          >
            Failed to load farms.
          </Alert>
        )}

        {/* ==================================
            LOADING
        ================================== */}

        {isLoading && (
          <Paper
            elevation={0}
            sx={{
              minHeight: 300,
              borderRadius: 3,
              border:
                "1px solid #E5E7EB",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              alignItems="center"
              spacing={2}
            >
              <CircularProgress
                color="success"
              />

              <Typography
                color="text.secondary"
              >
                Loading your farms...
              </Typography>
            </Stack>
          </Paper>
        )}

        {/* ==================================
            EMPTY FARMS
        ================================== */}

        {!isLoading &&
          !isError &&
          farms.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                py: 8,
                px: 3,
                textAlign: "center",

                borderRadius: 3,

                border:
                  "1px solid #E5E7EB",
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,

                  borderRadius: "50%",

                  bgcolor: "#DCFCE7",

                  color: "#16A34A",

                  display: "flex",
                  justifyContent:
                    "center",
                  alignItems: "center",

                  mx: "auto",
                  mb: 2,
                }}
              >
                <AgricultureIcon
                  sx={{
                    fontSize: 38,
                  }}
                />
              </Box>

              <Typography
                variant="h5"
                fontWeight={700}
              >
                No Farms Added
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
                mb={3}
              >
                Add your first farm to
                start managing your
                agricultural activities.
              </Typography>

              <Button
                component={Link}
                href="/farmer/farms/create"
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Add Your First Farm
              </Button>
            </Paper>
          )}

        {/* ==================================
            FARM TABLE
        ================================== */}

        {!isLoading &&
          !isError &&
          farms.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,

                border:
                  "1px solid #E5E7EB",

                overflow: "hidden",

                bgcolor: "#ffffff",
              }}
            >
              {/* ============================
                  TABLE TITLE
              ============================ */}

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
                spacing={1}
                sx={{
                  px: 3,
                  py: 2.5,

                  borderBottom:
                    "1px solid #098b4a",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Registered Farms
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    All farms registered
                    under your account.
                  </Typography>
                </Box>

                <Chip
                  label={`${farms.length} ${
                    farms.length === 1
                      ? "Farm"
                      : "Farms"
                  }`}
                  color="success"
                  variant="outlined"
                  sx={{
                    fontWeight: 700,
                  }}
                />
              </Stack>

              {/* ============================
                  TABLE
              ============================ */}

              <TableContainer
                sx={{
                  overflowX: "auto",
                }}
              >
                <Table
                  sx={{
                    minWidth: 900,
                  }}
                >
                  {/* ========================
                      TABLE HEADER
                  ======================== */}

                  <TableHead>
                    <TableRow
                      sx={{
                        bgcolor: "#F9FAFB",
                      }}
                    >
                      <TableCell
                        sx={headerCellStyle}
                      >
                        #
                      </TableCell>

                      <TableCell
                        sx={headerCellStyle}
                      >
                        Farm Name
                      </TableCell>

                      <TableCell
                        sx={headerCellStyle}
                      >
                        Area
                      </TableCell>

                      <TableCell
                        sx={headerCellStyle}
                      >
                        Soil Type
                      </TableCell>

                      <TableCell
                        sx={headerCellStyle}
                      >
                        Location
                      </TableCell>

                      <TableCell
                        sx={headerCellStyle}
                      >
                        Created
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={headerCellStyle}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* ========================
                      TABLE BODY
                  ======================== */}

                  <TableBody>
                    {farms.map(
                      (farm, index) => (
                        <TableRow
                          key={farm._id}
                          hover
                          sx={{
                            "&:last-child td":
                              {
                                borderBottom:
                                  "none",
                              },
                          }}
                        >
                          {/* SERIAL */}

                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              fontWeight={600}
                            >
                              {index + 1}
                            </Typography>
                          </TableCell>

                          {/* FARM NAME */}

                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                            >
                              <Box
                                sx={{
                                  width: 42,
                                  height: 42,

                                  borderRadius:
                                    "50%",

                                  bgcolor:
                                    "#DCFCE7",

                                  color:
                                    "#16A34A",

                                  display:
                                    "flex",

                                  justifyContent:
                                    "center",

                                  alignItems:
                                    "center",

                                  flexShrink: 0,
                                }}
                              >
                                <AgricultureIcon
                                  fontSize="small"
                                />
                              </Box>

                              <Box>
                                <Typography
                                  variant="body2"
                                  fontWeight={
                                    700
                                  }
                                  sx={{
                                    color:
                                      "#111827",
                                  }}
                                >
                                  {
                                    farm.farmName
                                  }
                                </Typography>

                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Registered Farm
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>

                          {/* AREA */}

                          <TableCell>
                            <Chip
                              label={
                                farm.area !=
                                null
                                  ? `${farm.area}`
                                  : "N/A"
                              }
                              size="small"
                              variant="outlined"
                              sx={{
                                fontWeight:
                                  600,
                              }}
                            />
                          </TableCell>

                          {/* SOIL TYPE */}

                          <TableCell>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                            >
                              {farm.soilType ||
                                "Not specified"}
                            </Typography>
                          </TableCell>

                          {/* LOCATION */}

                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={0.7}
                              alignItems="center"
                            >
                              <LocationOnOutlinedIcon
                                color="success"
                                sx={{
                                  fontSize:
                                    18,
                                }}
                              />

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {farm
                                  .location
                                  ?.lat !=
                                  null &&
                                farm
                                  .location
                                  ?.lng !=
                                  null
                                  ? `${farm.location.lat}, ${farm.location.lng}`
                                  : "Not available"}
                              </Typography>
                            </Stack>
                          </TableCell>

                          {/* CREATED */}

                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {farm.createdAt
                                ? new Date(
                                    farm.createdAt
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month:
                                        "short",
                                      year: "numeric",
                                    }
                                  )
                                : "N/A"}
                            </Typography>
                          </TableCell>

                          {/* ACTIONS */}

                          <TableCell
                            align="center"
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="center"
                            >
                              {/* EDIT */}

                              <Tooltip title="Edit Farm">
                                <IconButton
                                  component={
                                    Link
                                  }
                                  href={`/farmer/farms/${farm._id}/edit`}
                                  size="small"
                                  sx={{
                                    width: 38,
                                    height: 38,

                                    color:
                                      "#16A34A",

                                    bgcolor:
                                      "#F0FDF4",

                                    border:
                                      "1px solid #BBF7D0",

                                    "&:hover":
                                      {
                                        bgcolor:
                                          "#DCFCE7",
                                      },
                                  }}
                                >
                                  <EditOutlinedIcon
                                    fontSize="small"
                                  />
                                </IconButton>
                              </Tooltip>

                              {/* DELETE */}

                              <Tooltip title="Delete Farm">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    setSelectedFarmId(
                                      farm._id
                                    )
                                  }
                                  sx={{
                                    width: 38,
                                    height: 38,

                                    color:
                                      "#DC2626",

                                    bgcolor:
                                      "#FEF2F2",

                                    border:
                                      "1px solid #FECACA",

                                    "&:hover":
                                      {
                                        bgcolor:
                                          "#FEE2E2",
                                      },
                                  }}
                                >
                                  <DeleteForeverOutlinedIcon
                                    fontSize="small"
                                  />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* ============================
                  FETCHING INDICATOR
              ============================ */}

              {isFetching && (
                <Box
                  sx={{
                    py: 1.5,
                    textAlign: "center",
                    borderTop:
                      "1px solid #E5E7EB",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Refreshing farms...
                  </Typography>
                </Box>
              )}
            </Paper>
          )}

        {/* ==================================
            DELETE CONFIRMATION
        ================================== */}

        <Dialog
          open={Boolean(
            selectedFarmId
          )}
          onClose={() => {
            if (!isDeleting) {
              setSelectedFarmId(
                null
              );
            }
          }}
          PaperProps={{
            sx: {
              width: "100%",
              maxWidth: 430,
              borderRadius: 3,
              p: 0.5,
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
            }}
          >
            Delete Farm?
          </DialogTitle>

          <DialogContent>
            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.7,
              }}
            >
              Are you sure you want
              to delete this farm?
              This action cannot be
              undone.
            </Typography>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              pb: 2.5,
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={() =>
                setSelectedFarmId(
                  null
                )
              }
              disabled={isDeleting}
              sx={{
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>

            <Button
              color="error"
              variant="contained"
              disabled={isDeleting}
              startIcon={
                !isDeleting ? (
                  <DeleteForeverOutlinedIcon />
                ) : undefined
              }
              onClick={handleDelete}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              {isDeleting
                ? "Deleting..."
                : "Delete Farm"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

// ==========================================
// TABLE HEADER STYLE
// ==========================================

const headerCellStyle = {
  fontWeight: 700,
  color: "#374151",
  fontSize: "0.82rem",
  py: 2,
  whiteSpace: "nowrap",
};