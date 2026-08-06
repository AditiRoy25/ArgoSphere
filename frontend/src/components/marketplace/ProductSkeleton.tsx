"use client";

import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";

interface ProductSkeletonProps {
  count?: number;
}

export default function ProductSkeleton({
  count = 8,
}: ProductSkeletonProps) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
            }}
          >
            <Skeleton
              variant="rectangular"
              height={220}
            />

            <CardContent>
              <Stack spacing={2}>
                <Skeleton
                  variant="text"
                  height={32}
                  width="80%"
                />

                <Skeleton
                  variant="text"
                  width="60%"
                />

                <Skeleton
                  variant="text"
                  width="40%"
                />

                <Skeleton
                  variant="text"
                  width="50%"
                />

                <Stack
                  direction="row"
                  spacing={1}
                  mt={1}
                >
                  <Skeleton
                    variant="rounded"
                    width="50%"
                    height={40}
                  />

                  <Skeleton
                    variant="rounded"
                    width="50%"
                    height={40}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}