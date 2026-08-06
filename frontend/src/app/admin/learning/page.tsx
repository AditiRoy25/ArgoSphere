"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import LearningStatistics from "../../../components/learning/admin/LearningStatistics";
import CourseTable from "../../../components/learning/admin/CourseTable";

import {
  useGetLearningHomeQuery,
} from "../../../redux/api/learningApi";

export default function AdminLearningPage() {
  // ==========================================
  // API
  // ==========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetLearningHomeQuery();

  // ==========================================
  // DATA
  // ==========================================

  const stats =
    data?.data?.stats;

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
              Learning Management
            </Typography>

            <Typography
              color="text.secondary"
              mt={0.5}
            >
              Manage agricultural courses,
              learning content and farmer
              enrollments.
            </Typography>
          </Box>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.5}
            width={{
              xs: "100%",
              md: "auto",
            }}
          >
            <Button
              component={Link}
              href="/admin/learning/enrollments"
              variant="outlined"
              startIcon={
                <GroupsOutlinedIcon />
              }
            >
              Enrollments
            </Button>

            <Button
              component={Link}
              href="/admin/learning/courses/create"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Create Course
            </Button>
          </Stack>
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
            statistics.
          </Alert>
        )}

        {/* ==================================
            STATISTICS
        ================================== */}

        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Overview
          </Typography>

          <LearningStatistics
            stats={stats}
            loading={isFetching}
          />
        </Box>

        {/* ==================================
            QUICK ACTIONS
        ================================== */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
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
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  bgcolor: "success.light",
                  color: "success.dark",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MenuBookOutlinedIcon />
              </Box>

              <Box>
                <Typography
                  fontWeight={700}
                >
                  Course Management
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Create, update and manage
                  learning courses.
                </Typography>
              </Box>
            </Stack>

            <Button
              component={Link}
              href="/admin/learning/courses"
              endIcon={
                <ArrowForwardIcon />
              }
            >
              Manage Courses
            </Button>
          </Stack>
        </Paper>

        {/* ==================================
            RECENT / COURSE MANAGEMENT
        ================================== */}

        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Courses
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Manage available learning
                courses.
              </Typography>
            </Box>
          </Stack>

          <CourseTable />
        </Box>

      </Stack>
    </Container>
  );
}