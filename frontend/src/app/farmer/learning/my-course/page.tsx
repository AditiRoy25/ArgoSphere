"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import MyCourseCard from "@/components/learning/farmer/MyCourseCard";
import EmptyCourses from "@/components/learning/farmer/EmptyCourses";

import {
  useGetMyCoursesQuery,
} from "@/redux/api/learningApi";

type FilterType =
  | "all"
  | "enrolled"
  | "completed";

export default function MyCoursesPage() {
  // ==========================================
  // STATE
  // ==========================================

  const [filter, setFilter] =
    useState<FilterType>("all");

  // ==========================================
  // API
  // ==========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetMyCoursesQuery();

  // ==========================================
  // DATA
  // ==========================================

  const enrollments =
    data?.data ?? [];

  // ==========================================
  // COUNTS
  // ==========================================

  const totalCourses =
    enrollments.length;

  const inProgressCount =
    enrollments.filter(
      (item) =>
        item.status === "enrolled"
    ).length;

  const completedCount =
    enrollments.filter(
      (item) =>
        item.status === "completed"
    ).length;

  // ==========================================
  // FILTER COURSES
  // ==========================================

  const filteredCourses =
    useMemo(() => {
      if (filter === "all") {
        return enrollments;
      }

      return enrollments.filter(
        (item) =>
          item.status === filter
      );
    }, [
      enrollments,
      filter,
    ]);

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          py: 6,
        }}
      >
        <Box
          sx={{
            py: 8,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Unable to Load Courses
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Something went wrong while
            loading your enrolled
            courses.
          </Typography>
        </Box>
      </Container>
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
          md: 5,
        },
      }}
    >
      <Stack spacing={4}>

        {/* ==============================
            BACK BUTTON
        ============================== */}

        <Box>
          <Button
            component={Link}
            href="/farmer/learning"
            startIcon={
              <ArrowBackIcon />
            }
          >
            Back to Learning
          </Button>
        </Box>

        {/* ==============================
            HEADER
        ============================== */}

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
              My Courses
            </Typography>

            <Typography
              color="text.secondary"
              mt={0.5}
            >
              View your enrolled
              courses and continue your
              learning journey.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/learning/courses"
            variant="contained"
            startIcon={
              <SchoolOutlinedIcon />
            }
          >
            Browse Courses
          </Button>
        </Stack>

        {/* ==============================
            FILTERS
        ============================== */}

        {enrollments.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            {/* All */}

            <Chip
              label={`All (${totalCourses})`}
              clickable
              color={
                filter === "all"
                  ? "success"
                  : "default"
              }
              variant={
                filter === "all"
                  ? "filled"
                  : "outlined"
              }
              onClick={() =>
                setFilter("all")
              }
            />

            {/* In Progress */}

            <Chip
              label={`In Progress (${inProgressCount})`}
              clickable
              color={
                filter ===
                "enrolled"
                  ? "success"
                  : "default"
              }
              variant={
                filter ===
                "enrolled"
                  ? "filled"
                  : "outlined"
              }
              onClick={() =>
                setFilter(
                  "enrolled"
                )
              }
            />

            {/* Completed */}

            <Chip
              label={`Completed (${completedCount})`}
              clickable
              color={
                filter ===
                "completed"
                  ? "success"
                  : "default"
              }
              variant={
                filter ===
                "completed"
                  ? "filled"
                  : "outlined"
              }
              onClick={() =>
                setFilter(
                  "completed"
                )
              }
            />
          </Stack>
        )}

        {/* ==============================
            NO ENROLLMENTS
        ============================== */}

        {enrollments.length === 0 && (
          <EmptyCourses />
        )}

        {/* ==============================
            FILTER EMPTY STATE
        ============================== */}

        {enrollments.length > 0 &&
          filteredCourses.length ===
            0 && (
            <Box
              sx={{
                py: 10,
                textAlign:
                  "center",
                borderRadius: 4,
                border:
                  "1px solid",
                borderColor:
                  "divider",
              }}
            >
              <SchoolOutlinedIcon
                sx={{
                  fontSize: 65,
                  color:
                    "text.secondary",
                  mb: 2,
                }}
              />

              <Typography
                variant="h5"
                fontWeight={700}
              >
                {filter ===
                "completed"
                  ? "No Completed Courses"
                  : "No Courses In Progress"}
              </Typography>

              <Typography
                color="text.secondary"
                mt={1}
              >
                {filter ===
                "completed"
                  ? "Complete your enrolled courses and they will appear here."
                  : "You don't currently have any courses in progress."}
              </Typography>
            </Box>
          )}

        {/* ==============================
            COURSE GRID
        ============================== */}

        {filteredCourses.length >
          0 && (
          <Grid
            container
            spacing={3}
          >
            {filteredCourses.map(
              (enrollment) => (
                <Grid
                  key={
                    enrollment._id
                  }
                  size={{
                    xs: 12,
                    sm: 6,
                    lg: 4,
                  }}
                >
                  <MyCourseCard
                    enrollment={
                      enrollment
                    }
                  />
                </Grid>
              )
            )}
          </Grid>
        )}

        {/* ==============================
            BACKGROUND FETCH
        ============================== */}

        {isFetching &&
          !isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "center",
                py: 2,
              }}
            >
              <CircularProgress
                size={24}
              />
            </Box>
          )}
      </Stack>
    </Container>
  );
}