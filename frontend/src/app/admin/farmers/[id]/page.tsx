"use client";

import { useParams, useRouter } from "next/navigation";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useGetFarmerByIdQuery } from "@/src/redux/api/farmerApi";
import { useUnblockUserMutation } from "@/src/redux/api/adminApi";

export default function FarmerDetailsPage() {
  const router = useRouter();

  const { id } = useParams<{
    id: string;
  }>();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetFarmerByIdQuery(id);

  const [unblockUser, { isLoading: isUnblocking }] =
    useUnblockUserMutation();

  const farmer =
    data?.data ??
    data?.farmer;

  const getImageUrl = (image?: string) => {
    if (!image || image.startsWith("http")) {
      return image;
    }

    return `${process.env.NEXT_PUBLIC_API_URL}${image}`;
  };

  const handleUnblock = async () => {
    if (!farmer?._id) return;

    try {
      await unblockUser(farmer._id).unwrap();
      refetch();
    } catch (error) {
      console.error("UNBLOCK FARMER ERROR:", error);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !farmer) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">
          Farmer not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            startIcon={
              <ArrowBackIcon />
            }
            onClick={() =>
              router.back()
            }
          >
            Back
          </Button>

          <Stack direction="row" spacing={1}>
            {farmer.isBlocked && (
              <Button
                color="success"
                variant="contained"
                startIcon={<CheckCircleIcon />}
                disabled={isUnblocking}
                onClick={handleUnblock}
              >
                {isUnblocking ? "Unblocking..." : "Unblock"}
              </Button>
            )}

            {/* <Button
              variant="contained"
              startIcon={
                <EditIcon />
              }
              onClick={() =>
                router.push(
                  `/admin/farmers/edit/${farmer._id}`
                )
              }
            >
              Edit
            </Button> */}
          </Stack>
        </Stack>

        <Card>
          <CardContent>
            <Stack
              spacing={3}
              alignItems="center"
            >
              <Avatar
                src={
                  getImageUrl(
                    farmer.profileImage ??
                    farmer.image
                  )
                }
                sx={{
                  width: 120,
                  height: 120,
                }}
              />

              <Typography variant="h4">
                {farmer.name}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
              >
                <Chip
                  label={
                    farmer.isVerified
                      ? "Verified"
                      : "Pending"
                  }
                  color={
                    farmer.isVerified
                      ? "success"
                      : "warning"
                  }
                />

                <Chip
                  label={
                    farmer.isBlocked
                      ? "Blocked"
                      : "Active"
                  }
                  color={
                    farmer.isBlocked
                      ? "error"
                      : "success"
                  }
                />
              </Stack>
            </Stack>

            <Divider
              sx={{ my: 4 }}
            />

            <Grid
              container
              spacing={3}
            >
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Typography
                  color="text.secondary"
                >
                  Email
                </Typography>

                <Typography>
                  {farmer.email}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Typography
                  color="text.secondary"
                >
                  Phone
                </Typography>

                <Typography>
                  {farmer.phone}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Typography
                  color="text.secondary"
                >
                  Role
                </Typography>

                <Typography>
                  {farmer.role}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Typography
                  color="text.secondary"
                >
                  Joined
                </Typography>

                <Typography>
                  {new Date(
                    farmer.createdAt
                  ).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
