"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import type {
  GovernmentScheme,
} from "@/src/types/scheme";

interface Props {
  scheme: GovernmentScheme;

  isLoggedIn?: boolean;

  isFarmer?: boolean;

  alreadyApplied?: boolean;

  applying?: boolean;

  onApply?: (
    schemeId: string
  ) => void;
}

export default function SchemeCard({
  scheme,

  isLoggedIn = false,

  isFarmer = false,

  alreadyApplied = false,

  applying = false,

  onApply,
}: Props) {

  // ========================================
  // APPLY BUTTON
  // ========================================

  const renderApplyButton = () => {

    if (!isLoggedIn) {
      return (
        <Button
          component={Link}
          href="/login"
          variant="contained"
          color="success"
          fullWidth
          sx={{
            height: 48,
            borderRadius: 3,
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Login to Apply
        </Button>
      );
    }

    if (!isFarmer) {
      return (
        <Button
          disabled
          fullWidth
          variant="outlined"
          sx={{
            height: 48,
            borderRadius: 3,
            fontWeight: 700,
          }}
        >
          Farmers Only
        </Button>
      );
    }

    if (scheme.status === "Closed") {
      return (
        <Button
          disabled
          fullWidth
          color="error"
          variant="outlined"
          sx={{
            height: 48,
            borderRadius: 3,
            fontWeight: 700,
          }}
        >
          Scheme Closed
        </Button>
      );
    }

    if (alreadyApplied) {
      return (
        <Button
          disabled
          fullWidth
          variant="contained"
          color="success"
          startIcon={
            <CheckCircleIcon />
          }
          sx={{
            height: 48,
            borderRadius: 3,
            fontWeight: 700,

            "&.Mui-disabled": {
              bgcolor: "success.main",
              color: "#fff",
            },
          }}
        >
          Already Applied
        </Button>
      );
    }

    return (
      <Button
        fullWidth
        color="success"
        variant="contained"
        disabled={applying}
        onClick={() =>
          onApply?.(
            scheme._id
          )
        }
        sx={{
          height: 48,
          borderRadius: 3,
          fontWeight: 700,
          textTransform: "none",
        }}
      >
        {applying
          ? "Applying..."
          : "Apply Now"}
      </Button>
    );
  };

  return (

    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",

        borderRadius: 5,

        overflow: "hidden",

        backgroundColor: "#fff",

        border: "1px solid",

        borderColor: "#E5E7EB",

        transition: "all .35s ease",

        "&:hover": {

          transform:
            "translateY(-8px)",

          boxShadow:
            "0 15px 40px rgba(0,0,0,.12)",

          borderColor:
            "success.main",
        },
      }}
    >

      {/* =============================
          IMAGE
      ============================= */}

      <Box
        sx={{
          position: "relative",
          height: 50,
          overflow: "hidden",
        }}
      >

        {/* <CardMedia
          component="img"
          image={
            scheme.image ||
            "/images/schemes/default.jpg"
          }
          alt={scheme.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        /> */}

        <Chip
          label={scheme.status}
          color={
            scheme.status ===
            "Active"
              ? "success"
              : "default"
          }
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            fontWeight: 700,
          }}
        />

        <Chip
          label={scheme.category}
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "#fff",
            fontWeight: 700,
          }}
        />

      </Box>

      {/* =============================
          CONTENT
      ============================= */}

      <CardContent
        sx={{
          flex: 1,
          p: 3,
        }}
      >

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >

          <AccountBalanceIcon
            color="success"
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              lineHeight: 1.4,
            }}
          >
            {scheme.title}
          </Typography>

        </Stack>

        <Typography
          color="text.secondary"
          sx={{
            mb: 3,

            minHeight: 75,

            lineHeight: 1.8,

            display: "-webkit-box",

            overflow: "hidden",

            WebkitLineClamp: 3,

            WebkitBoxOrient:
              "vertical",
          }}
        >
          {scheme.description}
        </Typography>

        <Box
          sx={{
            bgcolor: "#F8FAF8",

            borderRadius: 3,

            p: 2,

            mb: 3,
          }}
        >

          <Stack spacing={2}>

                        {/* BENEFIT */}

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <CurrencyRupeeIcon
                color="success"
                fontSize="small"
              />

              <Typography variant="body2">
                <strong>
                  Benefit:
                </strong>{" "}
                ₹
                {Number(
                  scheme.amount
                ).toLocaleString(
                  "en-IN"
                )}
              </Typography>
            </Stack>

            {/* ELIGIBILITY */}

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <PersonIcon
                color="success"
                fontSize="small"
              />

              <Typography variant="body2">
                <strong>
                  Eligibility:
                </strong>{" "}
                {scheme.eligibility}
              </Typography>
            </Stack>

            {/* LAST DATE */}

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <CalendarMonthIcon
                color="success"
                fontSize="small"
              />

              <Typography variant="body2">
                <strong>
                  Last Date:
                </strong>{" "}
                {new Date(
                  scheme.lastDate
                ).toLocaleDateString(
                  "en-IN"
                )}
              </Typography>
            </Stack>

            {/* STATE */}

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <LocationOnIcon
                color="success"
                fontSize="small"
              />

              <Typography variant="body2">
                <strong>
                  State:
                </strong>{" "}
                {scheme.state}
              </Typography>
            </Stack>

          </Stack>

        </Box>

      </CardContent>

      {/* =============================
          ACTIONS
      ============================= */}

      <CardActions
        sx={{
          p: 3,
          pt: 0,
          gap: 2,
        }}
      >

        {/* DETAILS */}

        <Button
          component={Link}
          href={`/schemes/${scheme._id}`}
          variant="outlined"
          color="success"
          fullWidth
          sx={{
            height: 48,
            borderRadius: 3,
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          View Details
        </Button>

        {/* APPLY */}

        {renderApplyButton()}

      </CardActions>

    </Card>

  );
}