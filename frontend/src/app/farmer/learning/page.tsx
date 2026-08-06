"use client";

import Link from "next/link";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import MyCourseCard from "@/components/learning/farmer/MyCourseCard";
import EmptyCourses from "@/components/learning/farmer/EmptyCourses";

import {
  useGetMyCoursesQuery,
} from "@/redux/api/learningApi";

export default function FarmerLearningPage() {
  const {
    data,
    isLoading,
    isFetching,
  } = useGetMyCoursesQuery();

  const enrollments =
    data?.data ?? [];

  // --------------------------------
  // Statistics
  // --------------------------------

  const totalCourses =
    enrollments.length;

  const completedCourses =
    enrollments.filter(
      (item) =>
        item.status === "completed"
    ).length;

  const inProgressCourses =
    enrollments.filter(
      (item) =>
        item.status === "enrolled"
    ).length;

  const averageProgress =
    totalCourses > 0
      ? Math.round(
          enrollments.reduce(
            (total, item) =>
              total +
              (item.progress ?? 0),
            0
          ) / totalCourses
        )
      : 0;

  const statistics = [
    {
      title: "My Courses",
      value: totalCourses,
      icon: (
        <MenuBookOutlinedIcon />
      ),
    },
    {
      title: "In Progress",
      value: inProgressCourses,
      icon: (
        <TrendingUpOutlinedIcon />
      ),
    },
    {
      title: "Completed",
      value: completedCourses,
      icon: (
        <CheckCircleOutlineIcon />
      ),
    },
    {
      title: "Average Progress",
      value: `${averageProgress}%`,
      icon: (
        <SchoolOutlinedIcon />
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box
        minHeight="60vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <Stack spacing={4}>

        {/* ========================
            HEADER
        ======================== */}

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
              My Learning
            </Typography>

            <Typography
              color="text.secondary"
              mt={0.5}
            >
              Continue learning and
              improve your agricultural
              skills.
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

        {/* ========================
            STATISTICS
        ======================== */}

        <Grid
          container
          spacing={3}
        >
          {statistics.map(
            (item) => (
              <Grid
                key={item.title}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 3,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
                    border:
                      "1px solid",
                    borderColor:
                      "divider",
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
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            )
          )}
        </Grid>

        {/* ========================
            MY COURSES HEADER
        ======================== */}

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
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              Continue Learning
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              Pick up where you left
              off.
            </Typography>
          </Box>

          {enrollments.length >
            0 && (
            <Button
              component={Link}
              href="/farmer/learning/my-courses"
              endIcon={
                <ArrowForwardIcon />
              }
            >
              View All
            </Button>
          )}
        </Stack>

        {/* ========================
            COURSES
        ======================== */}

        {enrollments.length ===
        0 ? (
          <EmptyCourses />
        ) : (
          <Grid
            container
            spacing={3}
          >
            {enrollments
              .slice(0, 3)
              .map(
                (enrollment) => (
                  <Grid
                    key={
                      enrollment._id
                    }
                    size={{
                      xs: 12,
                      md: 6,
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

        {/* Background fetching */}

        {isFetching &&
          !isLoading && (
            <Box
              display="flex"
              justifyContent="center"
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