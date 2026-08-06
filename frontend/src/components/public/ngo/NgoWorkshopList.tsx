"use client";

import {
  Alert,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export default function NgoWorkshopList() {
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
          Workshops
        </Typography>

        <Alert severity="info">
          No workshops have been added by
          this NGO yet.
        </Alert>
      </CardContent>
    </Card>
  );
}