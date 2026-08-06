"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useGetMyFarmsQuery } from "@/src/redux/api/farmApi";
import type { Farm } from "@/src/types/farm.types";

export default function FarmOverview() {
  const {
    data,
    isLoading,
    isError,
  } = useGetMyFarmsQuery();

  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #ECECEC",
        }}
      >
        <CardContent>
          <Box
            sx={{display:"flex",
            justifyContent:"center",
            py:5}}
          >
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load farms.
      </Alert>
    );
  }

  const farms = data?.farms || [];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          sx={{ justifyContent:"space-between",
          alignItems:"center",
          mb:3}}
        >
          <Typography
            variant="h5"
            sx={{fontWeight:700}}
          >
            Farm Overview
          </Typography>

          <Button
            component={Link}
            href="/farmer/farms"
            variant="contained"
          >
            View All
          </Button>
        </Stack>

        {farms.length === 0 ? (
          <Typography
            sx={{textAlign:"center",
            color:"text.secondary",
            py:4}}
          >
            No farms found.
          </Typography>
        ) : (
          farms.map((farm: Farm) => (
            <Box
              key={farm._id}
              sx={{
                mb: 3,
                p: 2,
                borderRadius: 3,
                bgcolor: "#FAFAFA",
              }}
            >
              <Stack
                direction="row"
                sx={{ justifyContent:"space-between",
                mb:1}}
              >
                <Box>
                  <Typography sx={{fontWeight:700}}>
                    {farm.name}
                  </Typography>

                  <Typography color="text.secondary">
                    {farm.cropName}
                  </Typography>
                </Box>

                <Chip
                  label={farm.status}
                  color={
                    farm.status === "Healthy"
                      ? "success"
                      : farm.status === "Growing"
                      ? "info"
                      : farm.status === "Needs Water"
                      ? "warning"
                      : "default"
                  }
                />
              </Stack>

              <LinearProgress
                variant="determinate"
                value={farm.progress}
                sx={{
                  height: 10,
                  borderRadius: 10,
                }}
              />

              <Typography
    sx={{mt:1}}
                color="text.secondary"
              >
                {farm.progress}% Completed
              </Typography>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
