"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
  useGetMyCropsQuery,
} from "@/src/redux/api/cropCalendarApi";

import CropCalendarTable from "@/src/components/farmer/crop-calendar/CropCalendarTable";

export default function CropCalendarPage() {

  // ==========================================
  // API
  // ==========================================

  const {

    data,

    isLoading,

    isError,

    refetch,

  } = useGetMyCropsQuery();

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 10,
        }}
      >

        <CircularProgress
          color="success"
        />

      </Box>

    );

  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {

    return (

      <Container maxWidth="xl">

        <Alert
          severity="error"
          action={

            <Button
              color="inherit"
              onClick={() => refetch()}
            >
              Retry
            </Button>

          }
        >

          Failed to load Crop Calendar.

        </Alert>

      </Container>

    );

  }

  // ==========================================
  // PAGE
  // ==========================================

  return (

    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >

      {/* =======================================
          HEADER
      ======================================= */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          mb: 3,
        }}
      >

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          spacing={2}
        >

          <Box>

            <Typography
              variant="h4"
              fontWeight={700}
            >

              Crop Calendar

            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
            >

              Manage sowing, irrigation,
              fertilizer and harvest schedules.

            </Typography>

          </Box>

          <Button

            component={Link}

            href="/farmer/crop-calendar/create"

            variant="contained"

            color="success"

            startIcon={<AddIcon />}

            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.2,
            }}
          >

            Add Crop Schedule

          </Button>

        </Stack>

      </Paper>

      {/* =======================================
          TABLE
      ======================================= */}

      <CropCalendarTable

        crops={
          data?.crops ?? []
        }

      />

    </Container>

  );

}