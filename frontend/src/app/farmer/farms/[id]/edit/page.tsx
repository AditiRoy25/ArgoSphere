"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import SaveIcon from "@mui/icons-material/Save";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Link from "next/link";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useGetFarmQuery,
  useUpdateFarmMutation,
} from "@/src/redux/api/farmApi";

// ==========================================
// SOIL TYPES
// ==========================================

const soilTypes = [
  "Alluvial",
  "Black",
  "Red",
  "Laterite",
  "Loamy",
  "Clay",
  "Sandy",
  "Silty",
];

// ==========================================
// EDIT FARM PAGE
// ==========================================

export default function EditFarmPage() {
  const router = useRouter();

  const params = useParams();

  // ----------------------------------------
  // FARM ID
  // ----------------------------------------

  const id =
    typeof params.id === "string"
      ? params.id
      : "";

  // ========================================
  // GET FARM
  // ========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetFarmQuery(id, {
    skip: !id,
  });

  // ========================================
  // UPDATE FARM
  // ========================================

  const [
    updateFarm,
    {
      isLoading:
        isUpdating,
    },
  ] =
    useUpdateFarmMutation();

  // ========================================
  // FORM STATE
  // ========================================

  const [
    farmName,
    setFarmName,
  ] = useState("");

  const [
    area,
    setArea,
  ] = useState("");

  const [
    soilType,
    setSoilType,
  ] = useState("");

  const [
    lat,
    setLat,
  ] = useState("");

  const [
    lng,
    setLng,
  ] = useState("");

  const [
    formError,
    setFormError,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  // ========================================
  // SET EXISTING FARM DATA
  // ========================================

  useEffect(() => {
    if (!data?.farm) {
      return;
    }

    const farm =
      data.farm;

    setFarmName(
      farm.farmName ?? ""
    );

    setArea(
      farm.area != null
        ? String(farm.area)
        : ""
    );

    setSoilType(
      farm.soilType ?? ""
    );

    setLat(
      farm.location?.lat != null
        ? String(
            farm.location.lat
          )
        : ""
    );

    setLng(
      farm.location?.lng != null
        ? String(
            farm.location.lng
          )
        : ""
    );
  }, [data]);

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setFormError("");
      setSuccessMessage("");

      // ------------------------------------
      // VALIDATION
      // ------------------------------------

      if (!farmName.trim()) {
        setFormError(
          "Farm name is required."
        );

        return;
      }

      if (!area) {
        setFormError(
          "Farm area is required."
        );

        return;
      }

      if (
        Number(area) <= 0
      ) {
        setFormError(
          "Farm area must be greater than 0."
        );

        return;
      }

      if (!soilType) {
        setFormError(
          "Please select a soil type."
        );

        return;
      }

      if (
        lat === "" ||
        lng === ""
      ) {
        setFormError(
          "Latitude and longitude are required."
        );

        return;
      }

      const latitude =
        Number(lat);

      const longitude =
        Number(lng);

      if (
        Number.isNaN(
          latitude
        ) ||
        Number.isNaN(
          longitude
        )
      ) {
        setFormError(
          "Invalid farm location."
        );

        return;
      }

      if (
        latitude < -90 ||
        latitude > 90
      ) {
        setFormError(
          "Latitude must be between -90 and 90."
        );

        return;
      }

      if (
        longitude < -180 ||
        longitude > 180
      ) {
        setFormError(
          "Longitude must be between -180 and 180."
        );

        return;
      }

      // ------------------------------------
      // UPDATE
      // ------------------------------------

      try {
        await updateFarm({
          id,

          body: {
            farmName:
              farmName.trim(),

            area:
              Number(area),

            soilType,

            location: {
              lat: latitude,
              lng: longitude,
            },
          },
        }).unwrap();

        setSuccessMessage(
          "Farm updated successfully."
        );

        // Redirect after successful update

        setTimeout(() => {
          router.push(
            "/farmer/farms"
          );
        }, 600);
      } catch (err) {
        console.error(
          "UPDATE FARM ERROR:",
          err
        );

        const apiError =
          err as {
            data?: {
              message?: string;
            };
          };

        setFormError(
          apiError?.data
            ?.message ||
            "Failed to update farm."
        );
      }
    };

  // ========================================
  // LOADING
  // ========================================

  if (
    isLoading ||
    isFetching
  ) {
    return (
      <Box
        sx={{
          minHeight: "70vh",

          display: "flex",

          flexDirection:
            "column",

          alignItems:
            "center",

          justifyContent:
            "center",

          gap: 2,
        }}
      >
        <CircularProgress
          color="success"
        />

        <Typography
          color="text.secondary"
        >
          Loading farm...
        </Typography>
      </Box>
    );
  }

  // ========================================
  // GET FARM ERROR
  // ========================================

  if (isError) {
    console.error(
      "GET FARM ERROR:",
      error
    );

    return (
      <Container
        maxWidth="md"
        sx={{ py: 5 }}
      >
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          Unable to load this
          farm.
        </Alert>

        <Button
          component={Link}
          href="/farmer/farms"
          startIcon={
            <ArrowBackIcon />
          }
          color="success"
        >
          Back to My Farms
        </Button>
      </Container>
    );
  }

  // ========================================
  // FARM NOT FOUND
  // ========================================

  if (!data?.farm) {
    return (
      <Container
        maxWidth="md"
        sx={{ py: 5 }}
      >
        <Alert
          severity="warning"
          sx={{ mb: 3 }}
        >
          Farm not found.
        </Alert>

        <Button
          component={Link}
          href="/farmer/farms"
          color="success"
        >
          Back to My Farms
        </Button>
      </Container>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        bgcolor: "#F5F7FA",

        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Container maxWidth="md">

        {/* ================================
            BACK
        ================================ */}

        <Button
          component={Link}
          href="/farmer/farms"
          color="success"
          startIcon={
            <ArrowBackIcon />
          }
          sx={{
            mb: 3,

            textTransform:
              "none",

            fontWeight: 600,
          }}
        >
          Back to My Farms
        </Button>

        {/* ================================
            CARD
        ================================ */}

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,

            border:
              "1px solid",

            borderColor:
              "divider",

            overflow:
              "hidden",
          }}
        >

          {/* HEADER */}

          <Box
            sx={{
              px: {
                xs: 3,
                md: 5,
              },

              py: 3,

              bgcolor:
                "#F0FDF4",

              borderBottom:
                "1px solid",

              borderColor:
                "divider",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,

                  borderRadius:
                    "50%",

                  bgcolor:
                    "success.main",

                  color: "#fff",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >
                <AgricultureIcon />
              </Box>

              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  Edit Farm
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  Update your farm
                  information.
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* ================================
              FORM
          ================================ */}

          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
            }}
          >

            {/* ERROR */}

            {formError && (
              <Alert
                severity="error"
                sx={{ mb: 3 }}
                onClose={() =>
                  setFormError(
                    ""
                  )
                }
              >
                {formError}
              </Alert>
            )}

            {/* SUCCESS */}

            {successMessage && (
              <Alert
                severity="success"
                sx={{ mb: 3 }}
              >
                {
                  successMessage
                }
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={
                handleSubmit
              }
            >
              <Stack spacing={3}>

                {/* FARM NAME */}

                <TextField
                  label="Farm Name"
                  placeholder="Example: Green Valley Farm"
                  value={farmName}
                  onChange={(
                    event
                  ) =>
                    setFarmName(
                      event
                        .target
                        .value
                    )
                  }
                  required
                  fullWidth
                />

                {/* AREA */}

                <TextField
                  label="Farm Area"
                  type="number"
                  value={area}
                  onChange={(
                    event
                  ) =>
                    setArea(
                      event
                        .target
                        .value
                    )
                  }
                  required
                  fullWidth
                  slotProps={{
                    htmlInput: {
                      min: 0.01,
                      step: "any",
                    },
                  }}
                  helperText="Enter the farm area"
                />

                {/* SOIL */}

                <TextField
                  select
                  label="Soil Type"
                  value={soilType}
                  onChange={(
                    event
                  ) =>
                    setSoilType(
                      event
                        .target
                        .value
                    )
                  }
                  required
                  fullWidth
                >
                  {soilTypes.map(
                    (soil) => (
                      <MenuItem
                        key={soil}
                        value={soil}
                      >
                        {soil}
                      </MenuItem>
                    )
                  )}
                </TextField>

                {/* ==========================
                    LOCATION
                ========================== */}

                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={2}
                  >
                    <LocationOnIcon
                      color="success"
                    />

                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      Farm Location
                    </Typography>
                  </Stack>

                  <Stack
                    direction={{
                      xs:
                        "column",

                      sm:
                        "row",
                    }}
                    spacing={2}
                  >

                    {/* LAT */}

                    <TextField
                      label="Latitude"
                      type="number"
                      value={lat}
                      onChange={(
                        event
                      ) =>
                        setLat(
                          event
                            .target
                            .value
                        )
                      }
                      required
                      fullWidth
                      slotProps={{
                        htmlInput:
                          {
                            min:
                              -90,

                            max:
                              90,

                            step:
                              "any",
                          },
                      }}
                    />

                    {/* LNG */}

                    <TextField
                      label="Longitude"
                      type="number"
                      value={lng}
                      onChange={(
                        event
                      ) =>
                        setLng(
                          event
                            .target
                            .value
                        )
                      }
                      required
                      fullWidth
                      slotProps={{
                        htmlInput:
                          {
                            min:
                              -180,

                            max:
                              180,

                            step:
                              "any",
                          },
                      }}
                    />
                  </Stack>
                </Box>

                {/* ==========================
                    BUTTONS
                ========================== */}

                <Stack
                  direction={{
                    xs:
                      "column-reverse",

                    sm:
                      "row",
                  }}
                  spacing={2}
                  pt={2}
                >

                  {/* CANCEL */}

                  <Button
                    component={Link}
                    href="/farmer/farms"
                    variant="outlined"
                    fullWidth
                    disabled={
                      isUpdating
                    }
                    sx={{
                      height: 52,

                      borderRadius:
                        3,

                      fontWeight:
                        700,

                      textTransform:
                        "none",
                    }}
                  >
                    Cancel
                  </Button>

                  {/* UPDATE */}

                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={
                      isUpdating
                    }
                    startIcon={
                      isUpdating
                        ? (
                          <CircularProgress
                            size={
                              18
                            }
                            color="inherit"
                          />
                        )
                        : (
                          <SaveIcon />
                        )
                    }
                    sx={{
                      height: 52,

                      borderRadius:
                        3,

                      fontWeight:
                        700,

                      textTransform:
                        "none",
                    }}
                  >
                    {isUpdating
                      ? "Updating..."
                      : "Update Farm"}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}