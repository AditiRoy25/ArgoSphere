"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function NgoHero() {

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",

        background:
          "linear-gradient(135deg, #0f5c2d 0%, #16813e 55%, #3a9b4c 100%)",

        color: "#fff",

        py: {
          xs: 7,
          md: 10,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          bgcolor:
            "rgba(255,255,255,0.06)",
          top: -170,
          right: -80,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          bgcolor:
            "rgba(255,255,255,0.05)",
          bottom: -150,
          left: "40%",
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack
          spacing={3}
          sx={{
            maxWidth: 750,
          }}
        >
          <Chip
            icon={
              <VerifiedIcon />
            }
            label="Trusted NGO Network"
            sx={{
              width: "fit-content",

              bgcolor:
                "rgba(255,255,255,0.14)",

              color: "#fff",

              fontWeight: 600,

              "& .MuiChip-icon":
                {
                  color: "#fff",
                },
            }}
          />

          <GroupsIcon
            sx={{
              fontSize: 52,
            }}
          />

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              fontSize: {
                xs: "2.3rem",
                md: "3.6rem",
              },
              lineHeight: 1.1,
            }}
          >
            Partner NGOs
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 16,
                md: 18,
              },

              lineHeight: 1.8,

              color:
                "rgba(255,255,255,0.88)",

              maxWidth: 680,
            }}
          >
            Connect with organizations
            supporting farmers,
            strengthening rural
            communities and helping
            agricultural development
            across India.
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
          >
            <Button
              component={Link}
              href="/ngo/registration"
              variant="contained"
              size="large"
              endIcon={
                <ArrowForwardIcon />
              }
              sx={{
                bgcolor: "#f6a800",
                color: "#172000",
                px: 3,
                fontWeight: 700,

                "&:hover": {
                  bgcolor: "#ffb820",
                },
              }}
            >
              Register NGO
            </Button>

            <Button
              component={Link}
              href="/about"
              variant="outlined"
              size="large"
              sx={{
                color: "#fff",

                borderColor:
                  "rgba(255,255,255,.7)",

                px: 3,

                "&:hover": {
                  borderColor:
                    "#fff",

                  bgcolor:
                    "rgba(255,255,255,.08)",
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}