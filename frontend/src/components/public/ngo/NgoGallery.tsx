"use client";

import {
  Alert,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function NgoGallery() {
  return (
    <Card
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
        sx={{ fontWeight:700,
          mb:2}}
        >
          Gallery
        </Typography>

        <Alert severity="info">
          No gallery images are available
          for this NGO.
        </Alert>
      </CardContent>
    </Card>
  );
}