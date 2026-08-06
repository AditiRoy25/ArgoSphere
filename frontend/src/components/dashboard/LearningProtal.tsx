"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";

import {
  useGetMyCoursesQuery,
} from "../../redux/api/learningApi";

export default function LearningPortal() {
  // ==========================================
  // GET FARMER COURSES
  // ==========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMyCoursesQuery();

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 5,
            }}
          >
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
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
            progress.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // ==========================================
  // MY ENROLLMENTS
  // ==========================================

  const enrollments =
    data?.data ?? [];

  // Find an unfinished course first.
  // Otherwise use the first enrollment.

  const enrollment =
    enrollments.find(
      (item) =>
        item.status !==
        "completed"
    ) ??
    enrollments[0];

  // ==========================================
  // EMPTY
  // ==========================================

  if (
    !enrollment ||
    !enrollment.course
  ) {
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
          <Stack
            spacing={2}
            sx={{
              height: "100%",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems:
                  "center",
              }}
            >
              <SchoolIcon
                sx={{
                  color:
                    "success.main",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Learning Portal
              </Typography>
            </Stack>

            <Typography
              color="text.secondary"
            >
              You have not enrolled
              in any courses yet.
            </Typography>

            <Button
              component={Link}
              href="/learning/courses"
              variant="contained"
              fullWidth
              sx={{
                mt: "auto",
              }}
            >
              Browse Courses
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // ==========================================
  // COURSE
  // ==========================================

  const course =
    enrollment.course;

  const progress =
    Math.min(
      100,
      Math.max(
        0,
        enrollment.progress ??
          0
      )
    );

  // ==========================================
  // UI
  // ==========================================

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,

        border: "1px solid",

        borderColor:
          "divider",

        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          {/* ==================================
              HEADER
          ================================== */}

          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems:
                "center",
            }}
          >
            <SchoolIcon
              sx={{
                color:
                  "success.main",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              Learning Progress
            </Typography>
          </Stack>

          {/* ==================================
              COURSE
          ================================== */}

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 17,
              }}
            >
              {course.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 0.5,
                color:
                  "text.secondary",
              }}
            >
              {course.category}
            </Typography>
          </Box>

          {/* ==================================
              PROGRESS
          ================================== */}

          <Box>
            <Stack
              direction="row"
              sx={{
                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                mb: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Course Progress
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color:
                    "success.main",
                }}
              >
                {progress}%
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,

                borderRadius: 10,

                "& .MuiLinearProgress-bar":
                  {
                    borderRadius:
                      10,
                  },
              }}
            />
          </Box>

          {/* ==================================
              STATUS
          ================================== */}

          <Typography
            variant="body2"
            sx={{
              color:
                "text.secondary",
            }}
          >
            {enrollment.status ===
            "completed"
              ? "Course completed"
              : `${progress}% Completed`}
          </Typography>

          {/* ==================================
              BUTTON
          ================================== */}

          <Button
            component={Link}

            href={`/learning/courses/${course._id}`}

            variant={
              enrollment.status ===
              "completed"
                ? "outlined"
                : "contained"
            }

            fullWidth

            disabled={
              isFetching
            }
          >
            {enrollment.status ===
            "completed"
              ? "View Course"
              : "Continue Learning"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}