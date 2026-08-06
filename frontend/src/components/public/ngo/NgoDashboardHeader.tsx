"use client";

import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  ngoName: string;
  approved?: boolean;
}

export default function NgoDashboardHeader({
  ngoName,
  approved = false,
}: Props) {
  return (
    <Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={2}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            {ngoName}
          </Typography>

          <Typography
            color="text.secondary"
            mt={0.5}
          >
            NGO Dashboard
          </Typography>
        </Box>

        <Chip
          label={
            approved
              ? "Ministry Approved"
              : "Approval Pending"
          }
          color={
            approved
              ? "success"
              : "warning"
          }
        />
      </Stack>
    </Box>
  );
}