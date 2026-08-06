"use client";

import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import Link from "next/link";

export default function HeroBanner() {
  return (
    <Box
      sx={{
        height: 360,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        backgroundImage:
          "url('/images/marketplace/hero-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        px: {
          xs: 3,
          md: 8,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(255,255,255,.92), rgba(255,255,255,.55), rgba(255,255,255,.05))",
        }}
      />

      <Stack
        spacing={3}
        sx={{
          position: "relative",
          maxWidth: 520,
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
         sx={{ fontWeight:700}}
        >
          Everything You Need
          <br />
          for{" "}
          <Box
            component="span"
            color="success.main"
          >
            Better Farming
          </Box>
        </Typography>

        <Typography
          color="text.secondary"
        >
          Explore quality agricultural
          products including seeds,
          fertilizers, pumps, tools,
          harvesters and more from
          trusted sellers.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
        >
          <Link
            href="/marketplace"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="contained"
              size="large"
            >
              Shop Now
            </Button>
          </Link>

          <Link
            href="/schemes"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="outlined"
              size="large"
            >
              Government Schemes
            </Button>
          </Link>
        </Stack>

        <Stack
         sx={{ direction:"row",
          spacing:3,
          flexWrap:"wrap"}}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            ✅ Quality Assured
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            🚚 Fast Delivery
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            🔒 Secure Payment
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            ♻ Easy Returns
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}