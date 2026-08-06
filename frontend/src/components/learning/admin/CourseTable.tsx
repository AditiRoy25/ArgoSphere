"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import {
  useDeleteCourseMutation,
  useGetAdminCoursesQuery,
} from "../../../redux/api/learningApi";

import type {
  AdminCourseQueryParams,
  LearningCourse,
} from "../../../types/learning.types";

export default function CourseTable() {
  // --------------------------
  // Search
  // --------------------------

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [level, setLevel] =
    useState("");

  const [status, setStatus] =
    useState("");

  // --------------------------
  // Pagination
  // --------------------------

  const [page, setPage] =
    useState(0);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  // --------------------------
  // Delete Dialog
  // --------------------------

  const [
    selectedCourse,
    setSelectedCourse,
  ] =
    useState<LearningCourse | null>(
      null
    );

  const [
    openDelete,
    setOpenDelete,
  ] = useState(false);

  // --------------------------
  // Snackbar
  // --------------------------

  const [
    snackbar,
    setSnackbar,
  ] = useState({
    open: false,
    severity:
      "success" as
        | "success"
        | "error",
    message: "",
  });

  // --------------------------
  // Query Params
  // --------------------------

  const params: AdminCourseQueryParams =
    useMemo(
      () => ({
        page: page + 1,
        limit: rowsPerPage,
        search:
          search || undefined,
        category:
          category || undefined,
        level:
          level || undefined,
        status:
          status || undefined,
      }),
      [
        page,
        rowsPerPage,
        search,
        category,
        level,
        status,
      ]
    );

  // --------------------------
  // API
  // --------------------------

  const {
  data,
  isLoading,
  isFetching,
  isError,
  error,
} = useGetAdminCoursesQuery(params);

console.log("ADMIN COURSES DATA:", data);
console.log("ADMIN COURSES ERROR:", error);

  const [
    deleteCourse,
    {
      isLoading:
        deleting,
    },
  ] =
    useDeleteCourseMutation();

  const courses =
    data?.data ?? [];

  const total =
    data?.pagination?.total ??
    0;

  // --------------------------
  // Delete
  // --------------------------

  const handleDelete = (
    course: LearningCourse
  ) => {
    setSelectedCourse(course);
    setOpenDelete(true);
  };

    // --------------------------
  // Confirm Delete
  // --------------------------

  const confirmDelete = async () => {
    if (!selectedCourse) return;

    try {
      const response =
        await deleteCourse(
          selectedCourse._id
        ).unwrap();

      setSnackbar({
        open: true,
        severity: "success",
        message:
          response.message ||
          "Course deleted successfully.",
      });

      setOpenDelete(false);
      setSelectedCourse(null);
    } catch (error: any) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          error?.data?.message ||
          "Failed to delete course.",
      });
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        {/* Header */}

        <Box p={3}>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            justifyContent="space-between"
            spacing={2}
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              Learning Courses
            </Typography>

            <Button
              component={Link}
              href="/admin/learning/courses/create"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Course
            </Button>
          </Stack>

          {/* Search */}

          <Stack
            mt={3}
            spacing={2}
            direction={{
              xs: "column",
              lg: "row",
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search course..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
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

            <TextField
              select
              label="Category"
              size="small"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              sx={{
                minWidth: 180,
              }}
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="Crop Production">
                Crop Production
              </MenuItem>

              <MenuItem value="Soil Health">
                Soil Health
              </MenuItem>

              <MenuItem value="Organic Farming">
                Organic Farming
              </MenuItem>

              <MenuItem value="Irrigation">
                Irrigation
              </MenuItem>

              <MenuItem value="Livestock">
                Livestock
              </MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Level"
              value={level}
              onChange={(e) =>
                setLevel(
                  e.target.value
                )
              }
              sx={{
                minWidth: 170,
              }}
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="Beginner">
                Beginner
              </MenuItem>

              <MenuItem value="Intermediate">
                Intermediate
              </MenuItem>

              <MenuItem value="Advanced">
                Advanced
              </MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              sx={{
                minWidth: 150,
              }}
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="active">
                Active
              </MenuItem>

              <MenuItem value="inactive">
                Inactive
              </MenuItem>
            </TextField>
          </Stack>
        </Box>

 {/* ==========================================
    TABLE CONTENT
========================================== */}

{isLoading ? (
  <Box
    sx={{
      py: 8,
      textAlign: "center",
    }}
  >
    <CircularProgress />
  </Box>
) : (
  <>
    <TableContainer>
      <Table>
        {/* ==================================
            TABLE HEAD
        ================================== */}

        <TableHead>
          <TableRow>
            <TableCell>
              Image
            </TableCell>

            <TableCell>
              Course
            </TableCell>

            <TableCell>
              Category
            </TableCell>

            <TableCell>
              Level
            </TableCell>

            <TableCell>
              Duration
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell>
              Badges
            </TableCell>

            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        {/* ==================================
            TABLE BODY
        ================================== */}

        <TableBody>
          {courses.map(
            (course) => (
              <TableRow
                key={
                  course._id
                }
                hover
              >
                {/* Image */}

                <TableCell>
                  <Box
                    component="img"
                    src={
                      course.image ||
                      "/images/learning/default-course.jpg"
                    }
                    alt={
                      course.title
                    }
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: 2,
                      objectFit:
                        "cover",
                    }}
                  />
                </TableCell>

                {/* Course */}

                <TableCell>
                  <Typography
                    sx={{
                      fontWeight:
                        700,
                    }}
                  >
                    {
                      course.title
                    }
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        "text.secondary",
                    }}
                  >
                    {
                      course.trainer
                    }
                  </Typography>
                </TableCell>

                {/* Category */}

                <TableCell>
                  <Chip
                    label={
                      course.category
                    }
                    color="success"
                    size="small"
                  />
                </TableCell>

                {/* Level */}

                <TableCell>
                  <Chip
                    label={
                      course.level
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>

                {/* Duration */}

                <TableCell>
                  {
                    course.duration
                  }{" "}
                  hrs
                </TableCell>

                {/* Status */}

                <TableCell>
                  <Chip
                    label={
                      course.status
                    }
                    color={
                      course.status ===
                      "active"
                        ? "success"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>

                {/* Badges */}

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                  >
                    {course.isFeatured && (
                      <Chip
                        label="Featured"
                        color="primary"
                        size="small"
                      />
                    )}

                    {course.isBestseller && (
                      <Chip
                        label="Best"
                        color="warning"
                        size="small"
                      />
                    )}
                  </Stack>
                </TableCell>

                {/* Actions */}

                <TableCell align="center">
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent:
                        "center",
                    }}
                  >
                    {/* View */}

                    <Tooltip title="View">
                      <IconButton
                        component={
                          Link
                        }
                        href={`/learning/courses/${course._id}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    {/* Edit */}

                    <Tooltip title="Edit">
                      <IconButton
                        component={
                          Link
                        }
                        href={`/admin/learning/courses/${course._id}/edit`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    {/* Delete */}

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDelete(
                            course
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            )
          )}

          {/* ==================================
              EMPTY
          ================================== */}

          {courses.length ===
            0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
              >
                <Box
                  sx={{
                    py: 8,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight:
                        700,
                    }}
                  >
                    No Courses
                    Found
                  </Typography>

                  <Typography
                    sx={{
                      color:
                        "text.secondary",
                      mt: 1,
                    }}
                  >
                    There are no
                    learning courses
                    available.
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

    <TablePagination
      component="div"
      count={total}
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
      onPageChange={(
        _event,
        newPage
      ) => {
        setPage(
          newPage
        );
      }}
      onRowsPerPageChange={(
        event
      ) => {
        setRowsPerPage(
          Number(
            event.target
              .value
          )
        );

        setPage(0);
      }}
    />
  </>
)}

{/* ==========================================
    BACKGROUND FETCHING
========================================== */}

{isFetching &&
  !isLoading && (
    <Box
      sx={{
        py: 2,
        textAlign: "center",
      }}
    >
      <CircularProgress
        size={22}
      />
    </Box>
  )}
</Paper>

{/* Delete Dialog */}

<Dialog
  open={openDelete}
  onClose={() =>
    setOpenDelete(false)
  }
>
  <DialogTitle>
    Delete Course
  </DialogTitle>

  <DialogContent>
    <DialogContentText>
      Are you sure you want to
      delete{" "}
      <strong>
        {selectedCourse?.title}
      </strong>
      ?
    </DialogContentText>
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() =>
        setOpenDelete(false)
      }
    >
      Cancel
    </Button>

    <Button
      color="error"
      variant="contained"
      onClick={confirmDelete}
      disabled={deleting}
    >
      {deleting
        ? "Deleting..."
        : "Delete"}
    </Button>
  </DialogActions>
</Dialog>

{/* Snackbar */}

<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  onClose={() =>
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }
>
  <Alert
    severity={snackbar.severity}
    variant="filled"
  >
    {snackbar.message}
  </Alert>
</Snackbar>

</>
);
}

 