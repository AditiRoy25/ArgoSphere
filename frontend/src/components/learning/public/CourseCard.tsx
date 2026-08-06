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
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import type {
  LearningCourse,
} from "../../../types/learning.types";

// ==========================================
// PROPS
// ==========================================

interface Props {
  course: LearningCourse;

  onEnroll?: (
    id: string
  ) => void;

  enrolling?: boolean;

  enrolled?: boolean;
}

// ==========================================
// COMPONENT
// ==========================================

export default function CourseCard({
  course,
  onEnroll,
  enrolling = false,
  enrolled = false,
}: Props) {
  // ==========================================
  // IMAGE
  // ==========================================

  const imageUrl =
    course.image ||
    "/images/learning/default-course.jpg";

  // ==========================================
  // ENROLL
  // ==========================================

  const handleEnroll = () => {
    // Prevent duplicate click

    if (
      enrolled ||
      enrolling
    ) {
      return;
    }

    onEnroll?.(
      course._id
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,

        border:
          "1px solid",

        borderColor:
          enrolled
            ? "success.light"
            : "divider",

        overflow:
          "hidden",

        height:
          "100%",

        display:
          "flex",

        flexDirection:
          "column",

        transition:
          ".3s",

        "&:hover": {
          transform:
            "translateY(-6px)",

          boxShadow: 6,
        },
      }}
    >
      {/* =====================================
          IMAGE
      ===================================== */}

      <Box
        sx={{
          position:
            "relative",
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={imageUrl}
          alt={
            course.title
          }
          sx={{
            objectFit:
              "cover",
          }}
        />

        {/* ==================================
            CATEGORY
        ================================== */}

        <Chip
          label={
            course.category
          }
          color="success"
          size="small"
          sx={{
            position:
              "absolute",

            top: 12,

            left: 12,
          }}
        />

        {/* ==================================
            BESTSELLER
        ================================== */}

        {course.isBestseller && (
          <Chip
            icon={
              <WorkspacePremiumIcon />
            }
            label="Bestseller"
            color="warning"
            size="small"
            sx={{
              position:
                "absolute",

              top: 12,

              right: 12,
            }}
          />
        )}

        {/* ==================================
            ENROLLED BADGE
        ================================== */}

        {enrolled && (
          <Chip
            icon={
              <TaskAltIcon />
            }
            label="Enrolled"
            color="success"
            size="small"
            sx={{
              position:
                "absolute",

              bottom: 12,

              right: 12,

              fontWeight:
                700,
            }}
          />
        )}
      </Box>

      {/* =====================================
          CONTENT
      ===================================== */}

      <CardContent
        sx={{
          flex: 1,
        }}
      >
        {/* TITLE */}

        <Typography
          variant="h6"
          sx={{
            fontWeight:
              700,
          }}
          gutterBottom
        >
          {course.title}
        </Typography>

        {/* DESCRIPTION */}

        <Typography
          variant="body2"
          sx={{
            color:
              "text.secondary",

            mb: 2,

            minHeight:
              65,

            display:
              "-webkit-box",

            WebkitLineClamp:
              3,

            WebkitBoxOrient:
              "vertical",

            overflow:
              "hidden",
          }}
        >
          {
            course.description
          }
        </Typography>

        {/* ==================================
            COURSE INFORMATION
        ================================== */}

        <Stack spacing={1}>
          {/* LEVEL */}

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems:
                "center",
            }}
          >
            <SchoolIcon
              color="success"
              fontSize="small"
            />

            <Typography
              variant="body2"
            >
              {
                course.level
              }
            </Typography>
          </Stack>

          {/* DURATION */}

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems:
                "center",
            }}
          >
            <AccessTimeIcon
              color="success"
              fontSize="small"
            />

            <Typography
              variant="body2"
            >
              {
                course.duration
              }{" "}
              Hours
            </Typography>
          </Stack>

          {/* TRAINER */}

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems:
                "center",
            }}
          >
            <PersonIcon
              color="success"
              fontSize="small"
            />

            <Typography
              variant="body2"
            >
              {course.trainer ||
                "AgroSphere Expert"}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      {/* =====================================
          FOOTER
      ===================================== */}

      <CardActions
        sx={{
          p: 2,
          pt: 0,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width:
              "100%",
          }}
        >
          {/* DETAILS */}

          <Button
            component={Link}
            href={`/learning/courses/${course._id}`}
            variant="outlined"
            fullWidth
          >
            Details
          </Button>

          {/* ==================================
              ENROLL BUTTON
          ================================== */}

          <Button
            variant={
              enrolled
                ? "outlined"
                : "contained"
            }
            color="success"
            fullWidth
            disabled={
              enrolled ||
              enrolling
            }
            startIcon={
              enrolled
                ? (
                  <TaskAltIcon />
                )
                : undefined
            }
            onClick={
              handleEnroll
            }
          >
            {enrolled
              ? "Already Enrolled"
              : enrolling
              ? "Enrolling..."
              : "Enroll"}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}