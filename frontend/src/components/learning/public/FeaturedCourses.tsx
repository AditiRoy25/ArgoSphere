"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CourseCard from "./CourseCard";

import type {
  LearningCourse,
} from "@/types/learning";

// ==========================================
// PROPS
// ==========================================

interface Props {
  courses: LearningCourse[];

  loading?: boolean;

  enrolling?: boolean;

  enrollingCourseId?: string | null;

  onEnroll?: (
    id: string
  ) => void;

  isEnrolled?: (
    courseId: string
  ) => boolean;
}

// ==========================================
// COMPONENT
// ==========================================

export default function FeaturedCourses({
  courses,
  loading = false,
  enrolling = false,
  enrollingCourseId = null,
  onEnroll,
  isEnrolled,
}: Props) {
  return (
    <Box>
      {/* =====================================
          HEADER
      ===================================== */}

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        sx={{
          justifyContent:
            "space-between",

          alignItems: {
            xs: "flex-start",
            md: "center",
          },

          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Featured Courses
          </Typography>

          <Typography
            sx={{
              color:
                "text.secondary",

              mt: 0.5,
            }}
          >
            Learn from our most
            popular agricultural
            training programs.
          </Typography>
        </Box>

        <Button
          component={Link}
          href="/learning/courses"
          variant="outlined"
          endIcon={
            <ArrowForwardIcon />
          }
        >
          View All Courses
        </Button>
      </Stack>

      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (
        <Grid
          container
          spacing={3}
        >
          {[
            ...Array(6),
          ].map(
            (
              _,
              index
            ) => (
              <Grid
                key={index}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 4,
                }}
              >
                <Skeleton
                  variant="rounded"
                  height={430}
                />
              </Grid>
            )
          )}
        </Grid>
      )}

      {/* =====================================
          EMPTY
      ===================================== */}

      {!loading &&
        courses.length ===
          0 && (
          <Box
            sx={{
              py: 8,

              textAlign:
                "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight:
                  700,

                mb: 1,
              }}
            >
              No Featured
              Courses
            </Typography>

            <Typography
              sx={{
                color:
                  "text.secondary",
              }}
            >
              Featured courses
              will appear here
              once they are
              available.
            </Typography>
          </Box>
        )}

      {/* =====================================
          COURSE GRID
      ===================================== */}

      {!loading &&
        courses.length >
          0 && (
          <Grid
            container
            spacing={3}
          >
            {courses.map(
              (course) => {
                // =================================
                // CHECK ENROLLMENT
                // =================================

                const enrolled =
                  isEnrolled?.(
                    course._id
                  ) ??
                  false;

                // =================================
                // CHECK CURRENT ENROLLING COURSE
                // =================================

                const isThisCourseEnrolling =
                  enrollingCourseId ===
                  course._id;

                return (
                  <Grid
                    key={
                      course._id
                    }
                    size={{
                      xs: 12,
                      sm: 6,
                      lg: 4,
                    }}
                  >
                    <CourseCard
                      course={
                        course
                      }

                      enrolled={
                        enrolled
                      }

                      enrolling={
                        isThisCourseEnrolling
                      }

                      onEnroll={
                        onEnroll
                      }
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        )}
    </Box>
  );
}