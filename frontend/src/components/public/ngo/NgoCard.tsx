"use client";

import Link from "next/link";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

import type {
  INgo,
} from "@/src/types/ngo.types";

interface Props {
  ngo: INgo;
}

export default function NgoCard({
  ngo,
}: Props) {

  const logoUrl =
    ngo.logo
      ? ngo.logo.startsWith(
          "http"
        )
        ? ngo.logo
        : `${
            process.env
              .NEXT_PUBLIC_API_BASE_URL ??
            "http://localhost:5000"
          }${ngo.logo}`
      : "";

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",

        display: "flex",
        flexDirection: "column",

        borderRadius: 4,

        border:
          "1px solid #e2e9e3",

        bgcolor: "#fff",

        transition:
          "all .25s ease",

        "&:hover": {
          transform:
            "translateY(-6px)",

          boxShadow:
            "0 15px 40px rgba(26,85,45,.12)",

          borderColor:
            "#b8d8c0",
        },
      }}
    >
      {/* TOP DECORATION */}

      <Box
        sx={{
          height: 6,

          background:
            "linear-gradient(90deg,#16813e,#68b447)",
        }}
      />

      <CardContent
        sx={{
          p: 3,

          display: "flex",

          flexDirection:
            "column",

          flexGrow: 1,
        }}
      >
        {/* HEADER */}

        <Stack
          direction="row"
          justifyContent=
            "space-between"
          alignItems=
            "flex-start"
          spacing={2}
        >
          <Avatar
            src={logoUrl}
            sx={{
              width: 64,
              height: 64,

              bgcolor: "#e8f5eb",

              color: "#16813e",

              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {ngo.organizationName
              ?.charAt(0)
              .toUpperCase()}
          </Avatar>

          {ngo.ministryApproval && (
            <Chip
              icon={
                <VerifiedIcon />
              }
              label="Approved"
              color="success"
              size="small"
              variant="outlined"
            />
          )}
        </Stack>

        {/* NAME */}

        <Typography
          variant="h6"
          fontWeight={750}
          sx={{
            mt: 2.5,

            minHeight: 58,

            color: "#17351f",
          }}
        >
          {ngo.organizationName}
        </Typography>

        {/* LOCATION */}

        {ngo.address && (
          <Stack
            direction="row"
            spacing={0.8}
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 18,
                color:
                  "text.secondary",
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
            >
              {ngo.address}
            </Typography>
          </Stack>
        )}

        {/* REGISTRATION */}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <BusinessOutlinedIcon
            sx={{
              fontSize: 18,

              color:
                "text.secondary",
            }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Reg:{" "}
            <Box
              component="span"
              fontWeight={600}
              color="text.primary"
            >
              {
                ngo.registrationNumber
              }
            </Box>
          </Typography>
        </Stack>

        {/* DESCRIPTION */}

        {ngo.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 2,

              display:
                "-webkit-box",

              WebkitLineClamp: 2,

              WebkitBoxOrient:
                "vertical",

              overflow: "hidden",

              lineHeight: 1.7,
            }}
          >
            {ngo.description}
          </Typography>
        )}

        <Box flexGrow={1} />

        <Divider
          sx={{
            my: 2.5,
          }}
        />

        {/* VIEW */}

        <Button
          component={Link}
          href={`/ngo/${ngo._id}`}
          fullWidth
          variant="outlined"
          endIcon={
            <ArrowForwardIcon />
          }
          sx={{
            py: 1.1,

            fontWeight: 700,

            borderRadius: 2.5,
          }}
        >
          View NGO
        </Button>
      </CardContent>
    </Card>
  );
}