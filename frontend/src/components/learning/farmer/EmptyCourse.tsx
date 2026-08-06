"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

export default function EmptyCourses() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
        py: 8,
        px: 4,
        textAlign: "center",
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
      >
        <SchoolOutlinedIcon
          color="success"
          sx={{
            fontSize: 80,
          }}
        />

        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            No Enrolled Courses
          </Typography>

          <Typography
            mt={1}
            color="text.secondary"
          >
            You haven't enrolled in any
            course yet.

            <br />

            Browse our agriculture learning
            library and start learning today.
          </Typography>
        </Box>

        <Button
          component={Link}
          href="/learning"
          variant="contained"
          size="large"
        >
          Browse Courses
        </Button>
      </Stack>
    </Paper>
  );
}