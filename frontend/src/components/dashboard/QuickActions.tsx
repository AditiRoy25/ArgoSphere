"use client";

import Link from "next/link";

import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export default function QuickActions() {
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
          sx={{ fontWeight: 700, mb: 3 }}
        >
          Quick Actions
        </Typography>

        <Stack spacing={2}>

          <Button
            component={Link}
            href="/farmer/farms/create"
            variant="contained"
            fullWidth
          >
            Add New Farm
          </Button>

          <Button
            component={Link}
            href="/marketplace"
            variant="outlined"
            fullWidth
          >
            Buy Seeds
          </Button>

          <Button
            component={Link}
            href="/farmer/ai"
            variant="outlined"
            fullWidth
          >
            AI Crop Advisor
          </Button>

          <Button
            component={Link}
            href="/schemes"
            variant="outlined"
            fullWidth
          >
            Government Schemes
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}
