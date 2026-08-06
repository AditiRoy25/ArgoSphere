"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import {
  useGetAdminEnrollmentsQuery,
} from "@/redux/api/learningApi";

export default function AdminLearningEnrollmentsPage() {
  // ==========================================
  // STATE
  // ==========================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  // ==========================================
  // API
  // ==========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAdminEnrollmentsQuery();

  // ==========================================
  // ENROLLMENTS
  // ==========================================

  const enrollments = data?.data ?? [];

  // ==========================================
  // FILTER
  // ==========================================

  const filteredEnrollments = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return enrollments.filter((enrollment) => {
      const farmerName =
        enrollment.user?.name
          ?.toLowerCase() ?? "";

      const farmerEmail =
        enrollment.user?.email
          ?.toLowerCase() ?? "";

      const courseTitle =
        enrollment.course?.title
          ?.toLowerCase() ?? "";

      const courseCategory =
        enrollment.course?.category
          ?.toLowerCase() ?? "";

      const matchesSearch =
        !keyword ||
        farmerName.includes(keyword) ||
        farmerEmail.includes(keyword) ||
        courseTitle.includes(keyword) ||
        courseCategory.includes(keyword);

      const matchesStatus =
        !status ||
        enrollment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [enrollments, search, status]);

  // ==========================================
  // CLIENT SIDE PAGINATION
  // ==========================================

  const paginatedEnrollments = useMemo(() => {
    const start =
      page * rowsPerPage;

    const end =
      start + rowsPerPage;

    return filteredEnrollments.slice(
      start,
      end
    );
  }, [
    filteredEnrollments,
    page,
    rowsPerPage,
  ]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalEnrollments =
    enrollments.length;

  const completedCourses =
    enrollments.filter(
      (enrollment) =>
        enrollment.status === "completed"
    ).length;

  const inProgressCourses =
    enrollments.filter(
      (enrollment) =>
        enrollment.status === "enrolled"
    ).length;

  const averageProgress =
    totalEnrollments > 0
      ? Math.round(
          enrollments.reduce(
            (total, enrollment) =>
              total +
              (enrollment.progress ?? 0),
            0
          ) / totalEnrollments
        )
      : 0;

  const statistics = [
    {
      title: "Total Enrollments",
      value: totalEnrollments,
      icon: <GroupsOutlinedIcon />,
    },
    {
      title: "In Progress",
      value: inProgressCourses,
      icon: <TrendingUpOutlinedIcon />,
    },
    {
      title: "Completed",
      value: completedCourses,
      icon: <CheckCircleOutlineIcon />,
    },
    {
      title: "Average Progress",
      value: `${averageProgress}%`,
      icon: <SchoolOutlinedIcon />,
    },
  ];

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (
    date?: string
  ) => {
    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // PROGRESS
  // ==========================================

  const getProgress = (
    progress?: number
  ) => {
    return Math.min(
      100,
      Math.max(
        0,
        progress ?? 0
      )
    );
  };

  // ==========================================
  // SEARCH CHANGE
  // ==========================================

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);

    // Reset pagination when filtering
    setPage(0);
  };

  // ==========================================
  // STATUS CHANGE
  // ==========================================

  const handleStatusChange = (
    value: string
  ) => {
    setStatus(value);

    setPage(0);
  };

  // ==========================================
  // PAGE CHANGE
  // ==========================================

  const handlePageChange = (
    _: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // ==========================================
  // ROW PER PAGE
  // ==========================================

  const handleRowsPerPageChange = (
    event:
      React.ChangeEvent<
        HTMLInputElement
      >
  ) => {
    setRowsPerPage(
      parseInt(
        event.target.value,
        10
      )
    );

    setPage(0);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: {
          xs: 3,
          md: 4,
        },
      }}
    >
      <Stack spacing={4}>

        {/* ==================================
            BREADCRUMBS
        ================================== */}

        <Breadcrumbs>
          <Button
            component={Link}
            href="/admin"
            size="small"
            startIcon={
              <HomeOutlinedIcon />
            }
            sx={{
              color: "text.secondary",
            }}
          >
            Admin
          </Button>

          <Button
            component={Link}
            href="/admin/learning"
            size="small"
            sx={{
              color: "text.secondary",
            }}
          >
            Learning
          </Button>

          <Typography
            variant="body2"
            color="text.primary"
          >
            Enrollments
          </Typography>
        </Breadcrumbs>

        {/* ==================================
            HEADER
        ================================== */}

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          spacing={2}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
            >
              Course Enrollments
            </Typography>

            <Typography
              color="text.secondary"
              mt={0.5}
            >
              View and monitor farmer
              enrollments across learning
              courses.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/admin/learning"
            variant="outlined"
            startIcon={
              <ArrowBackIcon />
            }
          >
            Learning Dashboard
          </Button>
        </Stack>

        {/* ==================================
            ERROR
        ================================== */}

        {isError && (
          <Alert
            severity="error"
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
            Failed to load learning
            enrollments.
          </Alert>
        )}

        {/* ==================================
            STATISTICS
        ================================== */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },

            gap: 3,
          }}
        >
          {statistics.map((item) => (
            <Paper
              key={item.title}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    mt={1}
                  >
                    {item.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2,

                    bgcolor:
                      "success.light",

                    color:
                      "success.dark",

                    display: "flex",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",
                  }}
                >
                  {item.icon}
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>

        {/* ==================================
            ENROLLMENT TABLE
        ================================== */}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,

            border:
              "1px solid",

            borderColor:
              "divider",

            overflow: "hidden",
          }}
        >
          {/* ================================
              TABLE HEADER
          ================================ */}

          <Box
            sx={{
              p: 3,
              borderBottom:
                "1px solid",
              borderColor:
                "divider",
            }}
          >
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              justifyContent="space-between"
              alignItems={{
                xs: "stretch",
                md: "center",
              }}
              spacing={2}
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  All Enrollments
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {filteredEnrollments.length}{" "}
                  enrollment
                  {filteredEnrollments.length !==
                  1
                    ? "s"
                    : ""}
                </Typography>
              </Box>

              {/* Filters */}

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
                sx={{
                  width: {
                    xs: "100%",
                    md: "auto",
                  },
                }}
              >
                {/* Search */}

                <TextField
                  size="small"
                  placeholder="Search farmer or course..."
                  value={search}
                  onChange={(event) =>
                    handleSearchChange(
                      event.target.value
                    )
                  }
                  sx={{
                    minWidth: {
                      xs: "100%",
                      sm: 300,
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {/* Status */}

                <TextField
                  select
                  size="small"
                  label="Status"
                  value={status}
                  onChange={(event) =>
                    handleStatusChange(
                      event.target.value
                    )
                  }
                  sx={{
                    minWidth: 170,
                  }}
                >
                  <MenuItem value="">
                    All Status
                  </MenuItem>

                  <MenuItem value="enrolled">
                    In Progress
                  </MenuItem>

                  <MenuItem value="completed">
                    Completed
                  </MenuItem>
                </TextField>
              </Stack>
            </Stack>
          </Box>

          {/* ==================================
              BACKGROUND LOADING
          ================================== */}

          {isFetching &&
            !isLoading && (
              <LinearProgress />
            )}

          {/* ==================================
              TABLE
          ================================== */}

          <TableContainer>
            <Table
              sx={{
                minWidth: 950,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    Farmer
                  </TableCell>

                  <TableCell>
                    Course
                  </TableCell>

                  <TableCell>
                    Category
                  </TableCell>

                  <TableCell>
                    Progress
                  </TableCell>

                  <TableCell>
                    Status
                  </TableCell>

                  <TableCell>
                    Enrolled Date
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedEnrollments.map(
                  (enrollment) => {
                    const progress =
                      getProgress(
                        enrollment.progress
                      );

                    return (
                      <TableRow
                        key={
                          enrollment._id
                        }
                        hover
                      >
                        {/* ==================
                            FARMER
                        ================== */}

                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                          >
                            <Avatar>
                              {enrollment
                                .user
                                ?.name?.charAt(
                                  0
                                )
                                .toUpperCase() ||
                                "F"}
                            </Avatar>

                            <Box>
                              <Typography
                                fontWeight={
                                  700
                                }
                              >
                                {enrollment
                                  .user
                                  ?.name ||
                                  "Unknown Farmer"}
                              </Typography>

                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {enrollment
                                  .user
                                  ?.email ||
                                  "-"}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        {/* ==================
                            COURSE
                        ================== */}

                        <TableCell>
                          <Typography
                            fontWeight={
                              700
                            }
                          >
                            {enrollment
                              .course
                              ?.title ||
                              "Course unavailable"}
                          </Typography>

                          {enrollment
                            .course
                            ?.trainer && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Trainer:{" "}
                              {
                                enrollment
                                  .course
                                  .trainer
                              }
                            </Typography>
                          )}
                        </TableCell>

                        {/* ==================
                            CATEGORY
                        ================== */}

                        <TableCell>
                          {enrollment
                            .course
                            ?.category ? (
                            <Chip
                              label={
                                enrollment
                                  .course
                                  .category
                              }
                              size="small"
                              variant="outlined"
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>

                        {/* ==================
                            PROGRESS
                        ================== */}

                        <TableCell>
                          <Box
                            sx={{
                              width: 170,
                            }}
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              mb={0.7}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Progress
                              </Typography>

                              <Typography
                                variant="caption"
                                fontWeight={
                                  700
                                }
                              >
                                {progress}%
                              </Typography>
                            </Stack>

                            <LinearProgress
                              variant="determinate"
                              value={
                                progress
                              }
                              sx={{
                                height: 7,
                                borderRadius:
                                  10,
                              }}
                            />
                          </Box>
                        </TableCell>

                        {/* ==================
                            STATUS
                        ================== */}

                        <TableCell>
                          <Chip
                            size="small"
                            label={
                              enrollment.status ===
                              "completed"
                                ? "Completed"
                                : "In Progress"
                            }
                            color={
                              enrollment.status ===
                              "completed"
                                ? "success"
                                : "primary"
                            }
                            variant={
                              enrollment.status ===
                              "completed"
                                ? "filled"
                                : "outlined"
                            }
                          />
                        </TableCell>

                        {/* ==================
                            DATE
                        ================== */}

                        <TableCell>
                          <Typography
                            variant="body2"
                          >
                            {formatDate(
                              enrollment.createdAt
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}

                {/* ==================================
                    EMPTY
                ================================== */}

                {paginatedEnrollments.length ===
                  0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                    >
                      <Box
                        sx={{
                          py: 9,
                          textAlign:
                            "center",
                        }}
                      >
                        <GroupsOutlinedIcon
                          sx={{
                            fontSize: 60,
                            color:
                              "text.disabled",
                            mb: 2,
                          }}
                        />

                        <Typography
                          variant="h6"
                          fontWeight={
                            700
                          }
                        >
                          No Enrollments
                          Found
                        </Typography>

                        <Typography
                          color="text.secondary"
                          mt={0.5}
                        >
                          {search ||
                          status
                            ? "Try changing your search or status filter."
                            : "There are no course enrollments yet."}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ==================================
              PAGINATION
          ================================== */}

          {filteredEnrollments.length >
            0 && (
            <TablePagination
              component="div"
              count={
                filteredEnrollments.length
              }
              page={page}
              rowsPerPage={
                rowsPerPage
              }
              rowsPerPageOptions={[
                5,
                10,
                20,
                50,
              ]}
              onPageChange={
                handlePageChange
              }
              onRowsPerPageChange={
                handleRowsPerPageChange
              }
            />
          )}
        </Paper>
      </Stack>
    </Container>
  );
}