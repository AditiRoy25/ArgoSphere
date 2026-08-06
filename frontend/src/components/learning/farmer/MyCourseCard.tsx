"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";

import CourseProgress from "./CourseProgress";

import type {
  CourseEnrollment,
} from "@/types/learning";

interface Props {
  enrollment: CourseEnrollment;
}

export default function MyCourseCard({
  enrollment,
}: Props) {
  const { course } = enrollment;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        display: "flex",
        flexDirection: "column",

        transition: ".3s",

        "&:hover": {
          transform:
            "translateY(-6px)",
          boxShadow: 5,
        },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={
          course.image ||
          "/images/learning/default-course.jpg"
        }
        alt={course.title}
      />

      <CardContent sx={{ flex: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          mb={2}
        >
          <Chip
            label={course.category}
            color="success"
            size="small"
          />

          <Chip
            label={course.level}
            variant="outlined"
            size="small"
          />
        </Stack>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          {course.title}
        </Typography>

        <Typography
          mt={1}
          color="text.secondary"
          variant="body2"
        >
          {course.description}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          mt={2}
        >
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
          >
            <AccessTimeIcon
              fontSize="small"
              color="success"
            />

            <Typography
              variant="caption"
            >
              {course.duration} Hours
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
          >
            <SchoolIcon
              fontSize="small"
              color="success"
            />

            <Typography
              variant="caption"
            >
              {course.trainer}
            </Typography>
          </Stack>
        </Stack>

        <Box mt={3}>
          <CourseProgress
            progress={
              enrollment.progress
            }
            status={
              enrollment.status
            }
          />
        </Box>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
        }}
      >
        <Button
          component={Link}
          href={`/farmer/learning/${course._id}`}
          fullWidth
          variant="contained"
        >
          Continue Learning
        </Button>
      </CardActions>
    </Card>
  );
}