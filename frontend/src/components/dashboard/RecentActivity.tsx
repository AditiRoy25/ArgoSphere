"use client";

import {
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const activities = [
  "Rice irrigation completed.",
  "Purchased Organic Fertilizer.",
  "AI suggested nitrogen treatment.",
  "Weather alert received.",
  "Government subsidy approved.",
];

export default function RecentActivity() {
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
          Recent Activities
        </Typography>

        {activities.map((item, index) => (
          <div key={index}>
            <Typography sx={{ py: 2 }}>
              {item}
            </Typography>

            {index !== activities.length - 1 && (
              <Divider />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
