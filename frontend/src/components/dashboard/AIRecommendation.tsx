"use client";

import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export default function AIRecommendation() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
        height: "100%",
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          sx={{fontWeight:700,
          mb:2}}
        >
          AI Crop Advisor
        </Typography>

        <Typography
          color="text.secondary"
        >
          Based on today&apos;s weather and soil condition, irrigation is recommended
          in North Farm after 5 PM.
        </Typography>

        <Stack sx={{mt:4}}>

          <Button
            variant="contained"
            fullWidth
          >
            Ask AI Assistant
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}
