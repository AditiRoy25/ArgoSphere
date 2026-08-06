"use client";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import CourseForm from "@/components/learning/admin/CourseForm";

import {
  useGetAdminCourseByIdQuery,
} from "@/redux/api/learningApi";

export default function EditCoursePage() {
  // ==========================================
  // ROUTER
  // ==========================================

  const router =
    useRouter();

  const params =
    useParams<{
      id: string;
    }>();

  const courseId =
    params.id;

  // ==========================================
  // GET COURSE BY ID
  // ==========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } =
    useGetAdminCourseByIdQuery(
      courseId,
      {
        skip: !courseId,
      }
    );

  // ==========================================
  // COURSE
  // ==========================================

  const course =
    data?.data;

  // ==========================================
  // SUCCESS
  // ==========================================

  const handleSuccess =
    () => {
      router.push(
        "/admin/learning/courses"
      );

      router.refresh();
    };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight:
            "60vh",

          display:
            "flex",

          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
        >
          <CircularProgress />

          <Typography
            color="text.secondary"
          >
            Loading course...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    console.error(
      "Course fetch error:",
      error
    );

    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 5,
        }}
      >
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
          Failed to load course
          information.
        </Alert>

        <Button
          component={Link}
          href="/admin/learning/courses"
          startIcon={
            <ArrowBackIcon />
          }
          sx={{
            mt: 3,
          }}
        >
          Back to Courses
        </Button>
      </Container>
    );
  }

  // ==========================================
  // COURSE NOT FOUND
  // ==========================================

  if (!course) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 5,
        }}
      >
        <Box
          sx={{
            py: 10,

            textAlign:
              "center",

            border:
              "1px solid",

            borderColor:
              "divider",

            borderRadius:
              4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Course Not Found
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            The course you are
            trying to edit does not
            exist or has been
            removed.
          </Typography>

          <Button
            component={Link}
            href="/admin/learning/courses"
            variant="contained"
            startIcon={
              <ArrowBackIcon />
            }
            sx={{
              mt: 3,
            }}
          >
            Back to Courses
          </Button>
        </Box>
      </Container>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

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
            Edit
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
              <EditOutlinedIcon
                color="success"
                sx={{
                  fontSize: 36,
                }}
              />

              <Box>
                <Typography
                  variant="h4"
                  fontWeight={800}
                >
                  Edit Course
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={0.5}
                >
                  Update course
                  information and
                  learning settings.
                </Typography>
              </Box>
            </Stack>
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
            COURSE INFORMATION
        ================================== */}

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Editing
          </Typography>

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {course.title}
          </Typography>
        </Box>

        {/* ==================================
            BACKGROUND FETCH
        ================================== */}

        {isFetching &&
          !isLoading && (
            <Box
              sx={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap: 1,
              }}
            >
              <CircularProgress
                size={18}
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Refreshing course
                information...
              </Typography>
            </Box>
          )}

        {/* ==================================
            COURSE FORM
        ================================== */}

        <CourseForm
          course={course}
          isEdit
          onSuccess={
            handleSuccess
          }
        />
      </Stack>
    </Container>
  );
}