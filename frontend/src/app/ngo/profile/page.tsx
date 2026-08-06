"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import NgoDetailsHeader from "@/src/components/public/ngo/NgoDetailsHeader";

import {
  useGetMyNgoQuery,
} from "@/src/redux/api/ngoApi";

export default function NgoProfilePage() {

  const {
    data,
    isLoading,
    isError,
  } = useGetMyNgoQuery();

  const ngo =
    data?.data;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !ngo) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Alert severity="error">
          Failed to load NGO profile.
        </Alert>
      </Container>
    );
  }

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
          My NGO Profile
        </Typography>

        <Typography
          color="text.secondary"
        >
          View and manage your NGO
          information.
        </Typography>

        <NgoDetailsHeader ngo={ngo} />

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={700}>
              About this organization
            </Typography>
            <Typography color="text.secondary">
              {ngo.description || "No description provided."}
            </Typography>
            <Typography>
              Website: {ngo.website || "Not provided"}
            </Typography>
          </Stack>
        </Paper>

      </Stack>
    </Container>
  );
}
