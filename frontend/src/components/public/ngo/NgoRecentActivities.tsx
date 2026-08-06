"use client";

import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function NgoRecentActivities() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
      >
        Recent Activities
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography fontWeight={600}>
            NGO Dashboard
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Your recent activities will appear here.
          </Typography>
        </Box>

        <Divider />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          No recent activities available.
        </Typography>
      </Stack>
    </Paper>
  );
}