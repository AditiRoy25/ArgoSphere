"use client";

import Link from "next/link";

import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import CourseTable from "../../../../components/learning/admin/CourseTable";

export default function AdminLearningCoursesPage() {
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
        {/* =====================================
            BREADCRUMB
        ===================================== */}

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
            Courses
          </Typography>
        </Breadcrumbs>

        {/* =====================================
            HEADER
        ===================================== */}

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
              Course Management
            </Typography>

            <Typography
              color="text.secondary"
              mt={0.5}
            >
              Create, update, view and manage
              AgroSphere learning courses.
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
              href="/admin/learning"
              variant="outlined"
              startIcon={
                <ArrowBackIcon />
              }
            >
              Learning Dashboard
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

        {/* =====================================
            COURSE TABLE
        ===================================== */}

        <CourseTable />
      </Stack>
    </Container>
  );
}