"use client";

import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center" }}
        >

          <Avatar
            sx={{
              bgcolor: color,
              width: 60,
              height: 60,
            }}
          >
            {icon}
          </Avatar>

          <Stack>

            <Typography
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{ fontWeight: 700 }}
            >
              {value}
            </Typography>

            <Typography
              color="text.secondary"
              variant="body2"
            >
              {subtitle}
            </Typography>

          </Stack>

        </Stack>

      </CardContent>
    </Card>
  );
}

