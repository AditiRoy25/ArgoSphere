"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import LandscapeIcon from "@mui/icons-material/Landscape";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GrassIcon from "@mui/icons-material/Grass";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  useGetMyFarmsQuery,
} from "@/src/redux/api/farmApi";

export default function MyFarms() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetMyFarmsQuery();

console.log("MY FARMS DATA:", data);
  console.log("MY FARMS ERROR:", error);
  console.log("MY FARMS LOADING:", isLoading);
  
  const farms =
    data?.farms ?? [];

  // =====================================
  // LOADING
  // =====================================

  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          minHeight: 300,
        }}
      >
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            color="success"
          />
        </Box>
      </Card>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load your farms.
      </Alert>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2,
            md: 3,
          },
        }}
      >
        {/* ===============================
            HEADER
        =============================== */}

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          spacing={2}
          mb={3}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
                bgcolor:
                  "success.light",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              <AgricultureIcon
                color="success"
              />
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                My Farms
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {farms.length}{" "}
                {farms.length === 1
                  ? "farm"
                  : "farms"}{" "}
                registered
              </Typography>
            </Box>
          </Stack>

          <Button
            component={Link}
            href="/farmer/farms/create"
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Add Farm
          </Button>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* ===============================
            EMPTY
        =============================== */}

        {farms.length === 0 && (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
            }}
          >
            <AgricultureIcon
              color="success"
              sx={{
                fontSize: 55,
                mb: 1,
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              No Farms Added
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                mb: 3,
              }}
            >
              Add your first farm to
              start managing your
              agricultural activities.
            </Typography>

            <Button
              component={Link}
              href="/farmer/farms/create"
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
            >
              Add Your First Farm
            </Button>
          </Box>
        )}

        {/* ===============================
            FARM LIST
        =============================== */}

        {farms.length > 0 && (
          <Stack spacing={2}>
            {farms
              .slice(0, 3)
              .map((farm) => (
                <Box
                  key={farm._id}
                  sx={{
                    p: 2.5,

                    borderRadius: 3,

                    border:
                      "1px solid",

                    borderColor:
                      "divider",

                    transition:
                      "all .25s ease",

                    "&:hover": {
                      borderColor:
                        "success.main",

                      bgcolor:
                        "#FAFFFA",
                    },
                  }}
                >
                  {/* FARM NAME */}

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    mb={2}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <AgricultureIcon
                        color="success"
                      />

                      <Typography
                        fontWeight={700}
                      >
                        {farm.farmName}
                      </Typography>
                    </Stack>

                    <Button
                      component={Link}
                      href={`/farmer/farms/${farm._id}`}
                      size="small"
                      color="success"
                    >
                      Details
                    </Button>
                  </Stack>

                  {/* AREA */}

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={1.5}
                  >
                    <LandscapeIcon
                      color="success"
                      fontSize="small"
                    />

                    <Typography
                      variant="body2"
                    >
                      <strong>
                        Area:
                      </strong>{" "}
                      {farm.area}
                    </Typography>
                  </Stack>

                  {/* SOIL */}

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={1.5}
                  >
                    <GrassIcon
                      color="success"
                      fontSize="small"
                    />

                    <Typography
                      variant="body2"
                    >
                      <strong>
                        Soil:
                      </strong>{" "}
                      {farm.soilType ||
                        "Not specified"}
                    </Typography>
                  </Stack>

                  {/* LOCATION */}

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <LocationOnIcon
                      color="success"
                      fontSize="small"
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {farm.location?.lat !=
                        null &&
                      farm.location?.lng !=
                        null
                        ? `${farm.location.lat}, ${farm.location.lng}`
                        : "Location not available"}
                    </Typography>
                  </Stack>
                </Box>
              ))}

            {/* VIEW ALL */}

            {farms.length > 3 && (
              <Button
                component={Link}
                href="/farmer/farms"
                color="success"
                endIcon={
                  <ArrowForwardIcon />
                }
                sx={{
                  alignSelf:
                    "flex-start",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                View All Farms
              </Button>
            )}
          </Stack>
        )}

        {isFetching &&
          !isLoading && (
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Updating farms...
            </Typography>
          )}
      </CardContent>
    </Card>
  );
}