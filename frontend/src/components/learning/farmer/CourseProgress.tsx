"use client";

import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  progress: number;
  status: "enrolled" | "completed";
}

export default function CourseProgress({
  progress,
  status,
}: Props) {
  const color =
    status === "completed"
      ? "success"
      : progress >= 70
      ? "success"
      : progress >= 40
      ? "warning"
      : "primary";

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={1}
      >
        <Typography
          variant="body2"
          fontWeight={600}
        >
          Progress
        </Typography>

        <Chip
          size="small"
          color={
            status === "completed"
              ? "success"
              : "primary"
          }
          label={
            status === "completed"
              ? "Completed"
              : `${progress}%`
          }
        />
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress}
        color={color}
        sx={{
          height: 8,
          borderRadius: 20,
        }}
      />

      <Typography
        mt={1}
        variant="caption"
        color="text.secondary"
      >
        {progress}% Complete
      </Typography>
    </Box>
  );
}