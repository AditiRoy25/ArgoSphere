"use client";

import {
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

import type {
  LearningStats as LearningStatsType,
} from "@/types/learning";

// ==========================================
// PROPS
// ==========================================

interface Props {
  stats?: LearningStatsType;
}

// ==========================================
// DEFAULT STATS
// ==========================================

const defaultStats: LearningStatsType = {
  courses: 0,
  trainers: 0,
  learners: 0,
};

// ==========================================
// COMPONENT
// ==========================================

export default function LearningStats({
  stats = defaultStats,
}: Props) {
  // ========================================
  // SAFE VALUES
  // ========================================

  const courses =
    stats?.courses ?? 0;

  const trainers =
    stats?.trainers ?? 0;

  const learners =
    stats?.learners ?? 0;

  // ========================================
  // ITEMS
  // ========================================

  const items = [
    {
      title: "Courses",

      value: `${courses}+`,

      icon: (
        <MenuBookOutlinedIcon
          color="success"
        />
      ),
    },

    {
      title: "Expert Trainers",

      value: `${trainers}+`,

      icon: (
        <SchoolOutlinedIcon
          color="success"
        />
      ),
    },

    {
      title: "Farmers Learning",

      value: `${learners}+`,

      icon: (
        <GroupsOutlinedIcon
          color="success"
        />
      ),
    },
  ];

  // ========================================
  // UI
  // ========================================

  return (
    <Grid
      container
      spacing={3}
    >
      {items.map((item) => (
        <Grid
          key={item.title}
          size={{
            xs: 12,
            sm: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              height: "100%",

              p: 3,

              border:
                "1px solid",

              borderColor:
                "divider",

              borderRadius: 3,

              transition:
                "transform 0.3s ease, box-shadow 0.3s ease",

              "&:hover": {
                transform:
                  "translateY(-4px)",

                boxShadow: 4,
              },
            }}
          >
            <Stack
              spacing={2}
            >
              {/* Icon */}

              {item.icon}

              {/* Value */}

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,

                  color:
                    "success.main",
                }}
              >
                {item.value}
              </Typography>

              {/* Title */}

              <Typography
                variant="body1"
                sx={{
                  color:
                    "text.secondary",
                }}
              >
                {item.title}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}