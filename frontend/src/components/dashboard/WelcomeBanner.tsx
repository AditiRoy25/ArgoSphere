"use client";

import {
  Box,
  Typography,
} from "@mui/material";

export default function WelcomeBanner() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 700 }}
      >
        Welcome back, Ramesh! 👋
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        Here&apos;s what&apos;s happening on your farms today.
      </Typography>

      <Box
        component="img"
        src="/images/dashboard/banner.png"
        alt="banner"
        sx={{
          width: "100%",
          height: 180,
          mt: 3,
          borderRadius: 4,
          objectFit: "cover",
        }}
      />
    </Box>
  );
}
