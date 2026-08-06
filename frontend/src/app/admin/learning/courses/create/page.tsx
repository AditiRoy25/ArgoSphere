"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcon from "@mui/icons-material/Add";

import CourseForm from "../../../../../components/learning/admin/CourseForm";

export default function CreateCoursePage() {
  const router = useRouter();

  // ==========================================
  // SUCCESS
  // ==========================================

  const handleSuccess = () => {
    router.push(
      "/admin/learning/courses"
    );

    router.refresh();
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: {
          xs: 3,
          md: 4,
        },
      }}
    >
      <Stack spacing={4}>
        {/* ==================================
            BREADCRUMB
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
              color:
                "text.secondary",
            }}
          >
            Admin
          </Button>

          <Button
            component={Link}
            href="/admin/learning"
            size="small"
            sx={{
              color:
                "text.secondary",
            }}
          >
            Learning
          </Button>

          <Button
            component={Link}
            href="/admin/learning/courses"
            size="small"
            sx={{
              color:
                "text.secondary",
            }}
          >
            Courses
          </Button>

          <Typography
            variant="body2"
            color="text.primary"
          >
            Create
          </Typography>
        </Breadcrumbs>

        {/* ==================================
            HEADER
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
        >
          <Box>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
           <AddIcon
  sx={{
    fontSize: 36,
    color: "success.main",
  }}
/>

              <Typography
                variant="h4"
                fontWeight={800}
              >
                Create Course
              </Typography>
            </Stack>

            <Typography
              color="text.secondary"
              mt={1}
            >
              Add a new agricultural
              learning course to the
              AgroSphere platform.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/admin/learning/courses"
            variant="outlined"
            startIcon={
              <ArrowBackIcon />
            }
          >
            Back to Courses
          </Button>
        </Stack>

        {/* ==================================
            FORM
        ================================== */}

        <CourseForm
          isEdit={false}
          onSuccess={
            handleSuccess
          }
        />
      </Stack>
    </Container>
  );
}