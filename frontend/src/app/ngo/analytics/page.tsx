"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import {
  useGetNgoAnalyticsQuery,
} from "@/src/redux/api/ngoApi";

import NgoAnalyticsChart from "@/src/components/ngo/NgoAnalyticsChart";

export default function NgoAnalyticsPage() {

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetNgoAnalyticsQuery();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Alert
          severity="error"
          action={
            <Typography
              sx={{
                cursor: "pointer",
                fontWeight: 600,
              }}
              onClick={refetch}
            >
              Retry
            </Typography>
          }
        >
          Failed to load NGO analytics.
        </Alert>
      </Container>
    );
  }

  const analytics =
    data?.analytics ??
    data?.data ??
    {};

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={4}>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          NGO Analytics
        </Typography>

        <Typography
          color="text.secondary"
        >
          Monitor workshop
          performance,
          beneficiaries,
          donation growth and
          overall NGO progress.
        </Typography>

        <NgoAnalyticsChart
          monthlyData={
            analytics.monthlyData ??
            []
          }
          donationData={
            analytics.donationData ??
            []
          }
        />

      </Stack>
    </Container>
  );
}