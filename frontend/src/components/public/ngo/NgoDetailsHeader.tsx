"use client";

import Link from "next/link";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import VerifiedIcon from "@mui/icons-material/Verified";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import type { INgo } from "@/src/types/ngo.types";

interface Props {
  ngo: INgo;
}

export default function NgoDetailsHeader({
  ngo,
}: Props) {
  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={4}
        >
          {/* Logo */}

          <Avatar
            src={ngo.logo}
            sx={{
              width: 140,
              height: 140,
            }}
          />

          {/* Details */}

          <Stack
            spacing={2}
            flex={1}
          >
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                >
                  {ngo.organizationName}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  mt={2}
                >
                  {ngo.ministryApproval && (
                    <Chip
                      icon={
                        <VerifiedIcon />
                      }
                      label="Ministry Approved"
                      color="success"
                    />
                  )}
                </Stack>
              </Box>

              <Button
                component={Link}
                href="/ngo"
                startIcon={
                  <ArrowBackIcon />
                }
              >
                Back
              </Button>
            </Stack>

            <Divider />

            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <BadgeIcon color="primary" />

                <Typography>
                  Registration No:
                  {" "}
                  {ngo.registrationNumber}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <LocationOnIcon color="action" />

                <Typography>
                  {ngo.address ||
                    "Address not available"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}