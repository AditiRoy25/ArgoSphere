"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import SaveIcon from "@mui/icons-material/Save";

import Link from "next/link";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useCreateFarmMutation,
} from "@/src/redux/api/farmApi";

export default function CreateFarmPage() {
  const router = useRouter();

  const [
    createFarm,
    {
      isLoading,
      error,
      isError,
    },
  ] = useCreateFarmMutation();

  const [farmName, setFarmName] =
    useState("");

  const [area, setArea] =
    useState("");

  const [soilType, setSoilType] =
    useState("");

  const [lat, setLat] =
    useState("");

  const [lng, setLng] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setMessage("");

    if (
      !farmName.trim() ||
      !area ||
      !soilType.trim()
    ) {
      setMessage(
        "Farm name, area and soil type are required."
      );

      return;
    }

    try {
      await createFarm({
        farmName:
          farmName.trim(),

        area:
          Number(area),

        soilType:
          soilType.trim(),

        location: {
          lat:
            Number(lat) || 0,

          lng:
            Number(lng) || 0,
        },
      }).unwrap();

      router.push(
        "/farmer/farms"
      );
    } catch (err) {
      console.error(
        "CREATE FARM ERROR:",
        err
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Button
          component={Link}
          href="/farmer/dashboard"
          startIcon={
            <ArrowBackIcon />
          }
          color="success"
          sx={{ mb: 3 }}
        >
          Dashboard
        </Button>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border:
              "1px solid",
            borderColor:
              "divider",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              mb={4}
            >
              <AgricultureIcon
                color="success"
                sx={{
                  fontSize: 40,
                }}
              />

              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  Add New Farm
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Register your farm
                  with AgroSphere.
                </Typography>
              </Box>
            </Stack>

            {message && (
              <Alert
                severity="warning"
                sx={{ mb: 3 }}
              >
                {message}
              </Alert>
            )}

            {isError && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
              >
                Failed to create
                farm.
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={
                handleSubmit
              }
            >
              <Stack spacing={3}>
                <TextField
                  label="Farm Name"
                  value={farmName}
                  onChange={(e) =>
                    setFarmName(
                      e.target.value
                    )
                  }
                  required
                  fullWidth
                />

                <TextField
                  label="Farm Area"
                  type="number"
                  value={area}
                  onChange={(e) =>
                    setArea(
                      e.target.value
                    )
                  }
                  required
                  fullWidth
                  helperText="Enter your farm area"
                />

                <TextField
                  label="Soil Type"
                  value={soilType}
                  onChange={(e) =>
                    setSoilType(
                      e.target.value
                    )
                  }
                  required
                  fullWidth
                  placeholder="Example: Loamy"
                />

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                >
                  <TextField
                    label="Latitude"
                    type="number"
                    value={lat}
                    onChange={(e) =>
                      setLat(
                        e.target.value
                      )
                    }
                    fullWidth
                  />

                  <TextField
                    label="Longitude"
                    type="number"
                    value={lng}
                    onChange={(e) =>
                      setLng(
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                  disabled={
                    isLoading
                  }
                  startIcon={
                    isLoading
                      ? (
                        <CircularProgress
                          size={18}
                          color="inherit"
                        />
                      )
                      : (
                        <SaveIcon />
                      )
                  }
                  sx={{
                    height: 52,
                    borderRadius: 3,
                    fontWeight: 700,
                  }}
                >
                  {isLoading
                    ? "Creating..."
                    : "Create Farm"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}