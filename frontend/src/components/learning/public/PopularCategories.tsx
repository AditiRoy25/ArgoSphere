"use client";

import {
  Box,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import CategoryCard from "./CategoryCard";

interface Props {
  categories?: string[];

  loading?: boolean;

  onCategoryClick?: (
    category: string
  ) => void;
}

export default function PopularCategories({
  categories = [],
  loading = false,
  onCategoryClick,
}: Props) {
  return (
    <Box>
      {/* ==================================
          SECTION HEADER
      ================================== */}

      <Stack
        direction="row"
        sx={{
          justifyContent:
            "space-between",

          alignItems:
            "center",

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
            Popular Categories
          </Typography>

          <Typography
            sx={{
              color:
                "text.secondary",

              mt: 0.5,
            }}
          >
            Choose a topic and start
            learning.
          </Typography>
        </Box>
      </Stack>

      {/* ==================================
          LOADING
      ================================== */}

      {loading && (
        <Grid
          container
          spacing={3}
        >
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <Grid
              key={index}
              size={{
                xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
              }}
            >
              <Skeleton
                variant="rounded"
                height={180}
                sx={{
                  borderRadius: 3,
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ==================================
          EMPTY
      ================================== */}

      {!loading &&
        categories.length === 0 && (
          <Box
            sx={{
              py: 5,

              textAlign:
                "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
              }}
            >
              No Categories
              Available
            </Typography>

            <Typography
              sx={{
                color:
                  "text.secondary",

                mt: 0.5,
              }}
            >
              Learning categories
              will appear here.
            </Typography>
          </Box>
        )}

      {/* ==================================
          CATEGORIES
      ================================== */}

      {!loading &&
        categories.length > 0 && (
          <Grid
            container
            spacing={3}
          >
            {categories.map(
              (
                category,
                index
              ) => (
                <Grid
                  key={`${category}-${index}`}
                  size={{
                     xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
                  }}
                >
                  <CategoryCard
                    category={
                      category
                    }
                    onClick={
                      onCategoryClick
                    }
                  />
                </Grid>
              )
            )}
          </Grid>
        )}
    </Box>
  );
}