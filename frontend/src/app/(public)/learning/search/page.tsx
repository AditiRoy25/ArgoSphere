"use client";

import { useEffect } from "react";

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useSearchParams } from "next/navigation";

import CourseCard from "@/components/learning/public/CourseCard";

import {
  useEnrollCourseMutation,
  useLazySearchLearningCoursesQuery,
} from "@/redux/api/learningApi";

export default function LearningSearchPage() {

  const searchParams =
    useSearchParams();

  const query =
    searchParams.get("q") || "";

  const [

    searchCourses,

    {
      data,
      isLoading,
    },

  ] =
    useLazySearchLearningCoursesQuery();

  const [

    enrollCourse,

    {
      isLoading:
        enrolling,
    },

  ] =
    useEnrollCourseMutation();

  useEffect(() => {

    if (query) {

      searchCourses(query);

    }

  }, [
    query,
    searchCourses,
  ]);

  const handleEnroll =
    async (
      id: string
    ) => {

      try {

        await enrollCourse(id).unwrap();

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
          >
            Search Results
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            {query
              ? `Results for "${query}"`
              : "Search learning courses"}
          </Typography>
        </Box>

        {/* Loading */}

        {isLoading ? (
          <Box
            py={10}
            textAlign="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Empty */}

            {(!data?.data ||
              data.data.length === 0) && (
              <Box
                py={8}
                textAlign="center"
              >
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  No Results Found
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Try another keyword
                  like Soil, Organic,
                  Irrigation or
                  Livestock.
                </Typography>
              </Box>
            )}

            {/* Course Grid */}

            {data?.data &&
              data.data.length > 0 && (
                <Grid
                  container
                  spacing={3}
                >
                  {data.data.map(
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
              )}
          </>
        )}
      </Stack>
    </Container>
  );
}