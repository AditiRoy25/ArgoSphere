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
  Stack,
  Typography,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { useMySchemesQuery } from "../../redux/api/schemeApi";

export default function GovernmentSchemeCard() {
  const {
    data,
    isLoading,
    isError,
  } = useMySchemesQuery();

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
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 4,
            }}
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
        Failed to load government schemes.
      </Alert>
    );
  }

  const application = data?.applications?.[0];

  if (!application) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #ECECEC",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 0.5 }}
          >
            Government Schemes
          </Typography>

          <Typography color="text.secondary">
            You haven&apos;t applied for any schemes yet.
          </Typography>

          <Button
            component={Link}
            href="/schemes"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Browse Schemes
          </Button>
        </CardContent>
      </Card>
    );
  }

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
          spacing={1}
          sx={{ flexDirection: "row", alignItems: "center", mb: 2 }}
        >
          <AccountBalanceIcon color="success" />

          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            Government Scheme
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          {application.scheme.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {application.scheme.description}
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            mb: 3,
          }}
        >
          <Chip
            label={application.status}
            color={
              application.status === "Approved"
                ? "success"
                : application.status === "Pending"
                ? "warning"
                : "error"
            }
          />

          <Typography
            sx={{ fontWeight: 700 }}
            color="primary"
          >
            ₹{application.scheme.amount}
          </Typography>
        </Stack>

        <Button
          component={Link}
          href={`/schemes/${application.scheme._id}`}
          variant="contained"
          fullWidth
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
