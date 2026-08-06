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
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  useGetUpcomingCropsQuery,
} from "@/src/redux/api/cropCalendarApi";

export default function CropCalendar() {

  const {

    data,

    isLoading,

    isError,

  } = useGetUpcomingCropsQuery();

  // =====================================
  // LOADING
  // =====================================

  if (isLoading) {

    return (

      <Card
        sx={{
          borderRadius: 4,
          height: "100%",
        }}
      >

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 6,
          }}
        >

          <CircularProgress
            color="success"
          />

        </CardContent>

      </Card>

    );

  }

  // =====================================
  // ERROR
  // =====================================

  if (isError) {

    return (

      <Alert severity="error">

        Unable to load crop calendar.

      </Alert>

    );

  }

  // =====================================
  // EMPTY
  // =====================================

  if (!data?.crops?.length) {

    return (

      <Card
        sx={{
          borderRadius: 4,
        }}
      >

        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >

            Crop Calendar

          </Typography>

          <Alert severity="info">

            No upcoming crop activities.

          </Alert>

          <Button

            component={Link}

            href="/farmer/crop-calendar/create"

            variant="contained"

            color="success"

            sx={{
              mt: 3,
            }}

          >

            Create Schedule

          </Button>

        </CardContent>

      </Card>

    );

  }

  // =====================================
  // PAGE
  // =====================================

  return (

    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >

      <CardContent>

        {/* HEADER */}

        <Stack

          direction="row"

          justifyContent="space-between"

          alignItems="center"

          mb={3}

        >

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >

            <CalendarMonthIcon
              color="success"
            />

            <Typography
              variant="h6"
              fontWeight={700}
            >

              Crop Calendar

            </Typography>

          </Stack>

          <Button

            component={Link}

            href="/farmer/crop-calendar"

            size="small"

            endIcon={
              <ArrowForwardIcon />
            }

          >

            View All

          </Button>

        </Stack>

        {/* LIST */}

        <Stack spacing={2}>

          {data.crops.map((crop) => {

            const today =
              new Date();

            const harvest =
              new Date(
                crop.harvestDate
              );

            const diff =
              Math.ceil(
                (harvest.getTime() -
                  today.getTime()) /
                  (1000 *
                    60 *
                    60 *
                    24)
              );

            return (

              <Box
                key={crop._id}
              >

                <Stack

                  direction="row"

                  justifyContent="space-between"

                  alignItems="center"

                >

                  <Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >

                      <AgricultureIcon
                        color="success"
                        fontSize="small"
                      />

                      <Typography
                        fontWeight={700}
                      >

                        {crop.cropName}

                      </Typography>

                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >

                      {crop.farm.farmName}

                    </Typography>

                  </Box>

                  <Chip

                    color={
                      diff <= 7
                        ? "error"
                        : diff <= 15
                        ? "warning"
                        : "success"
                    }

                    label={`${diff} Days`}

                  />

                </Stack>

                <Typography

                  mt={1}

                  variant="body2"

                  color="text.secondary"

                >

                  Harvest :
                  {" "}
                  {new Date(
                    crop.harvestDate
                  ).toLocaleDateString(
                    "en-IN"
                  )}

                </Typography>

                <Divider
                  sx={{
                    mt: 2,
                  }}
                />

              </Box>

            );

          })}

        </Stack>

      </CardContent>

    </Card>

  );

}