"use client";

import {
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";

export default function SoilHealthCard() {
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
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Soil Health
        </Typography>

        <Typography>
          Overall Score
        </Typography>

        <LinearProgress
          value={84}
          variant="determinate"
          sx={{
            height: 12,
            borderRadius: 10,
            mt: 2,
          }}
        />

        <Typography sx={{ mt: 2 }}>
          Excellent
        </Typography>
      </CardContent>
    </Card>
  );
}
