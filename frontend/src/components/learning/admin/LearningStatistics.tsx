"use client";

import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

import type {
  LearningStats,
} from "@/types/learning";

interface Props {
  stats?: LearningStats;
  loading?: boolean;
}

export default function LearningStatistics({
  stats,
  loading = false,
}: Props) {
  const items = [
    {
      title: "Total Courses",
      value: stats?.courses ?? 0,
      icon: <MenuBookOutlinedIcon fontSize="large" />,
      color: "#2E7D32",
      bg: "#E8F5E9",
    },
    {
      title: "Expert Trainers",
      value: stats?.trainers ?? 0,
      icon: <SchoolOutlinedIcon fontSize="large" />,
      color: "#1565C0",
      bg: "#E3F2FD",
    },
    {
      title: "Active Learners",
      value: stats?.learners ?? 0,
      icon: <GroupsOutlinedIcon fontSize="large" />,
      color: "#EF6C00",
      bg: "#FFF3E0",
    },
    {
      title: "Platform Status",
      value: "Active",
      icon: <TrendingUpOutlinedIcon fontSize="large" />,
      color: "#6A1B9A",
      bg: "#F3E5F5",
    },
  ];

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid
          key={item.title}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          {loading ? (
            <Skeleton
              variant="rounded"
              height={150}
            />
          ) : (
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                transition: ".3s",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={1}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={700}
                    >
                      {item.value}
                    </Typography>
                  </Stack>

                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      bgcolor: item.bg,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
}