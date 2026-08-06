"use client";

import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

import {
  useGetMyNgoQuery,
  useGetMyStatisticsQuery,
} from "@/src/redux/api/ngoApi";


// =====================================
// NGO DASHBOARD PAGE
// =====================================

export default function NgoDashboardPage() {

  const router = useRouter();


  // =====================================
  // NGO PROFILE
  // =====================================

  const {
    data: ngoData,
    isLoading: ngoLoading,
    isError: ngoError,
    refetch: refetchNgo,
  } = useGetMyNgoQuery();


  // =====================================
  // STATISTICS
  // =====================================

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetMyStatisticsQuery();


  // =====================================
  // DATA
  // =====================================

  const ngo =
    ngoData?.data;

  const stats =
    statsData?.data;


  // =====================================
  // LOADING
  // =====================================

  if (
    ngoLoading ||
    statsLoading
  ) {
    return (
      <Box
        minHeight="60vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }


  // =====================================
  // ERROR
  // =====================================

  if (
    ngoError ||
    !ngo
  ) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 5,
        }}
      >
        <Stack spacing={2}>

          <Alert severity="error">
            NGO profile could not be loaded.
          </Alert>

          <Button
            variant="contained"
            onClick={() =>
              refetchNgo()
            }
          >
            Try Again
          </Button>

        </Stack>
      </Container>
    );
  }


  // =====================================
  // PAGE
  // =====================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f6f8f6",
        py: 4,
      }}
    >
      <Container maxWidth="xl">

        <Stack spacing={4}>

          {/* =================================
              BACK BUTTON
          ================================= */}

          <Box>
            <Button
              variant="outlined"
              color="success"
              startIcon={
                <ArrowBackIcon />
              }
              onClick={() =>
                router.push("/ngo")
              }
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 2.5,
              }}
            >
              Back to Public NGO Page
            </Button>
          </Box>


          {/* =================================
              HEADER
          ================================= */}

          <Box
            sx={{
              p: {
                xs: 3,
                md: 4,
              },

              borderRadius: 4,

              background:
                "linear-gradient(135deg, #0f5c2d 0%, #16813e 100%)",

              color: "#fff",

              boxShadow:
                "0 10px 30px rgba(15,92,45,0.18)",
            }}
          >
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
              spacing={3}
            >

              <Box>

                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {ngo.organizationName}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.7,
                    color:
                      "rgba(255,255,255,0.8)",
                  }}
                >
                  NGO Dashboard
                </Typography>

              </Box>


              <Chip
                label={
                  ngo.ministryApproval
                    ? "Ministry Approved"
                    : "Approval Pending"
                }
                sx={{
                  fontWeight: 700,

                  bgcolor:
                    ngo.ministryApproval
                      ? "#e8f5e9"
                      : "#fff3e0",

                  color:
                    ngo.ministryApproval
                      ? "#1b5e20"
                      : "#e65100",
                }}
              />

            </Stack>
          </Box>


          {/* =================================
              STATISTICS ERROR
          ================================= */}

          {statsError && (
            <Alert severity="warning">
              Dashboard statistics could not be loaded.
            </Alert>
          )}


          {/* =================================
              STATISTICS
          ================================= */}

          <Grid
            container
            spacing={3}
          >

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <StatCard
                title="Workshops"
                value={
                  stats?.totalWorkshops ??
                  0
                }
                icon={
                  <GroupsIcon />
                }
              />
            </Grid>


            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <StatCard
                title="Beneficiaries"
                value={
                  stats?.totalBeneficiaries ??
                  0
                }
                icon={
                  <PeopleIcon />
                }
              />
            </Grid>


            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <StatCard
                title="Reports"
                value={
                  stats?.totalReports ??
                  0
                }
                icon={
                  <DescriptionIcon />
                }
              />
            </Grid>


            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <StatCard
                title="Donations"
                value={
                  stats?.totalDonations ??
                  0
                }
                icon={
                  <VolunteerActivismIcon />
                }
              />
            </Grid>

          </Grid>


          {/* =================================
              NGO INFORMATION
          ================================= */}

          <Card
            elevation={0}
            sx={{
              borderRadius: 4,

              border:
                "1px solid #e1e8e2",

              boxShadow:
                "0 5px 20px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  md: 4,
                },
              }}
            >

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  mb: 3,
                }}
              >
                NGO Information
              </Typography>


              <Grid
                container
                spacing={4}
              >

                {/* ORGANIZATION */}

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <InfoItem
                    label="Organization"
                    value={
                      ngo.organizationName
                    }
                  />
                </Grid>


                {/* REGISTRATION */}

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <InfoItem
                    label="Registration Number"
                    value={
                      ngo.registrationNumber
                    }
                  />
                </Grid>


                {/* ADDRESS */}

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <InfoItem
                    label="Address"
                    value={
                      ngo.address ||
                      "Not provided"
                    }
                  />
                </Grid>


                {/* WEBSITE */}

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <InfoItem
                    label="Website"
                    value={
                      ngo.website ||
                      "Not provided"
                    }
                  />
                </Grid>


                {/* DESCRIPTION */}

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <InfoItem
                    label="Description"
                    value={
                      ngo.description ||
                      "No description provided"
                    }
                  />
                </Grid>

              </Grid>

            </CardContent>
          </Card>

        </Stack>

      </Container>
    </Box>
  );
}


// =====================================
// STAT CARD
// =====================================

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",

        borderRadius: 3,

        border:
          "1px solid #e1e8e2",

        transition:
          "all 0.25s ease",

        "&:hover": {
          transform:
            "translateY(-4px)",

          boxShadow:
            "0 10px 30px rgba(15,92,45,0.10)",
        },
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                mt: 1,
              }}
            >
              {value}
            </Typography>

          </Box>


          <Box
            sx={{
              width: 48,
              height: 48,

              borderRadius: 2,

              bgcolor: "#e8f5e9",

              color: "#16813e",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "& svg": {
                fontSize: 27,
              },
            }}
          >
            {icon}
          </Box>

        </Stack>

      </CardContent>
    </Card>
  );
}


// =====================================
// INFO ITEM
// =====================================

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 0.7,
        }}
      >
        {label}
      </Typography>

      <Typography
        fontWeight={600}
        sx={{
          wordBreak:
            "break-word",
        }}
      >
        {value}
      </Typography>

    </Box>
  );
}