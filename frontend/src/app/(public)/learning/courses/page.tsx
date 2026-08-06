"use client";

import { useState } from "react";

import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useSearchParams } from "next/navigation";

import CourseCard from "../../../../components/learning/public/CourseCard";

import {
  useEnrollCourseMutation,
  useGetLearningCoursesQuery,
} from "../../../../redux/api/learningApi";

export default function LearningCoursesPage() {

  const searchParams =
    useSearchParams();

  const category =
    searchParams.get(
      "category"
    ) || "";

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const {
    data,
    isLoading,
  } =
    useGetLearningCoursesQuery({

      page,

      limit: 9,

      category,

      search,

    });

  const [

    enrollCourse,

    {
      isLoading:
        enrolling,
    },

  ] =
    useEnrollCourseMutation();

  const handleEnroll =
    async (
      id: string
    ) => {

      try {

        await enrollCourse(
          id
        ).unwrap();

      } catch (error) {

        console.log(error);

      }

    };

      return (
    <Container
      maxWidth="xl"
      sx={{
        py: 5,
      }}
    >
      <Stack spacing={4}>
        {/* Header */}

        <Box>
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
          >
            Learning Courses
          </Typography>

          <Typography
            color="text.secondary"
          >
            Explore agricultural courses and
            improve your farming skills.
          </Typography>
        </Box>

        {/* Search */}

        <TextField
          fullWidth
          placeholder="Search courses..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        {/* Category */}

        {category && (
          <Typography
            variant="h6"
          >
            Category :
            <strong>
              {" "}
              {category}
            </strong>
          </Typography>
        )}

        {/* Loading */}

        {isLoading ? (
          <Box
            py={10}
            textAlign="center"
          >
            Loading...
          </Box>
        ) : (
          <>
            {/* Course Grid */}

            <Grid
              container
              spacing={3}
            >
              {data?.data.map(
                (course) => (
                  <Grid
                    key={course._id}
                    size={{
                      xs: 12,
                      sm: 6,
                      lg: 4,
                    }}
                  >
                    <CourseCard
                      course={course}
                      enrolling={
                        enrolling
                      }
                      onEnroll={
                        handleEnroll
                      }
                    />
                  </Grid>
                )
              )}
            </Grid>

            {/* Empty */}

            {data?.data.length ===
              0 && (
              <Box
                py={8}
                textAlign="center"
              >
                <Typography
                  variant="h6"
                >
                  No Courses Found
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Try another
                  category or
                  search keyword.
                </Typography>
              </Box>
            )}

            {/* Pagination */}

            <Stack
              mt={4}
              alignItems="center"
            >
              <Pagination
                color="primary"
                page={page}
                count={
                  data?.pagination
                    ?.totalPages ??
                  1
                }
                onChange={(
                  _,
                  value
                ) =>
                  setPage(
                    value
                  )
                }
              />
            </Stack>
          </>
        )}
      </Stack>
    </Container>
  );
}