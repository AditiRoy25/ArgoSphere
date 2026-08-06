"use client";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", crop: 20 },
  { month: "Feb", crop: 35 },
  { month: "Mar", crop: 40 },
  { month: "Apr", crop: 55 },
  { month: "May", crop: 72 },
  { month: "Jun", crop: 90 },
];

export default function DashboardCharts() {
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
         sx={{ fontWeight:700,
          mb:3}}
        >
          Crop Yield Analytics
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="month" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="crop"
              stroke="#2E7D32"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}