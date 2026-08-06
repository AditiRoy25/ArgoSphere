"use client";

import {
  useState,
} from "react";

import {
  Alert,
  Box,
  Container,
  Grid,
  Snackbar,
  Stack,
} from "@mui/material";

import {
  useRouter,
} from "next/navigation";

import Navbar from "@/src/components/common/Navbar";

import LearningHero from "../../../components/learning/public/LearningHero";
import LearningStats from "../../../components/learning/public/LearningStats";
import PopularCategories from "../../../components/learning/public/PopularCategories";
import FeaturedCourses from "../../../components/learning/public/FeaturedCourses";
import WhyLearn from "../../../components/learning/public/WhyLearn";
import LearningCTA from "../../../components/learning/public/LearningCTA";

import {
  useEnrollCourseMutation,
  useGetLearningHomeQuery,
  useGetMyCoursesQuery,
} from "../../../redux/api/learningApi";

// ==========================================
// NOTIFICATION TYPE
// ==========================================

type NotificationSeverity =
  | "success"
  | "error"
  | "info"
  | "warning";

// ==========================================
// PAGE
// ==========================================

export default function LearningPage() {
  const router =
    useRouter();

  // ==========================================
  // STATE
  // ==========================================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    enrollingCourseId,
    setEnrollingCourseId,
  ] = useState<
    string | null
  >(null);

  const [
    notification,
    setNotification,
  ] = useState<{
    open: boolean;
    message: string;
    severity:
      NotificationSeverity;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // ==========================================
  // LEARNING HOME
  // ==========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } =
    useGetLearningHomeQuery();

  // ==========================================
  // FARMER MY COURSES
  // ==========================================

  const {
    data: myCoursesData,
  } =
    useGetMyCoursesQuery();

  // ==========================================
  // ENROLL MUTATION
  // ==========================================

  const [
    enrollCourse,
  ] =
    useEnrollCourseMutation();

  // ==========================================
  // SAFE LEARNING DATA
  // ==========================================

  const learningData =
    data?.data;

  const stats =
    learningData?.stats ?? {
      courses: 0,
      trainers: 0,
      learners: 0,
    };

  const categories =
    learningData
      ?.categories ??
    [];

  const featuredCourses =
    learningData
      ?.featuredCourses ??
    [];

  // ==========================================
  // ENROLLED COURSE IDS
  // ==========================================

  const enrolledCourseIds =
    new Set(
      (
        myCoursesData
          ?.data ?? []
      )
        .filter(
          (enrollment) =>
            Boolean(
              enrollment.course
            )
        )
        .map(
          (enrollment) =>
            enrollment
              .course._id
        )
    );

  // ==========================================
  // DEBUG
  // REMOVE LATER
  // ==========================================

  if (isError) {
    console.error(
      "LEARNING HOME ERROR:",
      error
    );
  }

  // ==========================================
  // NOTIFICATION
  // ==========================================

  const showNotification = (
    message: string,
    severity:
      NotificationSeverity
  ) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const closeNotification =
    () => {
      setNotification(
        (previous) => ({
          ...previous,
          open: false,
        })
      );
    };

  // ==========================================
  // ENROLL
  // ==========================================

  const handleEnroll =
    async (
      courseId: string
    ) => {
      // Already enrolled

      if (
        enrolledCourseIds.has(
          courseId
        )
      ) {
        showNotification(
          "You are already enrolled in this course.",
          "info"
        );

        return;
      }

      try {
        setEnrollingCourseId(
          courseId
        );

        const response =
          await enrollCourse(
            courseId
          ).unwrap();

        showNotification(
          response.message ||
            "Course enrolled successfully.",
          "success"
        );
      } catch (error: any) {
        console.error(
          "ENROLL COURSE ERROR:",
          error
        );

        // Backend duplicate
        if (
          error?.status ===
          409
        ) {
          showNotification(
            error?.data
              ?.message ||
              "You are already enrolled in this course.",
            "info"
          );

          return;
        }

        // Authentication
        if (
          error?.status ===
          401
        ) {
          showNotification(
            "Please login to enroll in this course.",
            "warning"
          );

          return;
        }

        // Forbidden
        if (
          error?.status ===
          403
        ) {
          showNotification(
            error?.data
              ?.message ||
              "You are not allowed to enroll in this course.",
            "error"
          );

          return;
        }

        showNotification(
          error?.data
            ?.message ||
            "Failed to enroll in course.",
          "error"
        );
      } finally {
        setEnrollingCourseId(
          null
        );
      }
    };

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch =
    () => {
      const query =
        search.trim();

      if (!query) {
        return;
      }

      router.push(
        `/learning/search?q=${encodeURIComponent(
          query
        )}`
      );
    };

  // ==========================================
  // CATEGORY
  // ==========================================

  const handleCategory = (
    category: string
  ) => {
    router.push(
      `/learning/courses?category=${encodeURIComponent(
        category
      )}`
    );
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <>
      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Stack spacing={8}>
          {/* ==================================
              HERO
          ================================== */}

          <LearningHero
            stats={stats}
            search={search}
            onSearchChange={
              setSearch
            }
            onSearch={
              handleSearch
            }
          />

          {/* ==================================
              STATISTICS
          ================================== */}

          <LearningStats
            stats={stats}
          />

          {/* ==================================
              CATEGORIES
          ================================== */}

          <PopularCategories
            categories={
              categories
            }
            loading={
              isLoading ||
              isFetching
            }
            onCategoryClick={
              handleCategory
            }
          />

          {/* ==================================
              FEATURED + WHY LEARN
          ================================== */}

          <Grid
            container
            spacing={4}
          >
            <Grid
              size={{
                xs: 12,
                lg: 8,
              }}
            >
              <FeaturedCourses
                courses={
                  featuredCourses
                }
                loading={
                  isLoading
                }
                enrolling={
                  Boolean(
                    enrollingCourseId
                  )
                }
                enrollingCourseId={
                  enrollingCourseId
                }
                onEnroll={
                  handleEnroll
                }
                isEnrolled={(
                  courseId
                ) =>
                  enrolledCourseIds.has(
                    courseId
                  )
                }
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                lg: 4,
              }}
            >
              <WhyLearn />
            </Grid>
          </Grid>

          {/* ==================================
              CTA
          ================================== */}

          <Box>
            <LearningCTA />
          </Box>
        </Stack>
      </Container>

      {/* ======================================
          NOTIFICATION
      ====================================== */}

      <Snackbar
        open={
          notification.open
        }
        autoHideDuration={
          4000
        }
        onClose={
          closeNotification
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={
            notification.severity
          }
          variant="filled"
          onClose={
            closeNotification
          }
          sx={{
            width: "100%",
          }}
        >
          {
            notification.message
          }
        </Alert>
      </Snackbar>
    </>
  );
}