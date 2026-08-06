"use client";

import Link from "next/link";

import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function NgoQuickActions() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
      >
        Quick Actions
      </Typography>

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        flexWrap="wrap"
      >
        <Button
          component={Link}
          href="/ngo/workshops"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Workshops
        </Button>

        <Button
          component={Link}
          href="/ngo/profile"
          variant="outlined"
          startIcon={<PersonIcon />}
        >
          Profile
        </Button>

        <Button
          component={Link}
          href="/ngo/reports"
          variant="outlined"
          startIcon={
            <AssessmentIcon />
          }
        >
          Reports
        </Button>

        <Button
          component={Link}
          href="/ngo/schemes"
          variant="outlined"
          startIcon={
            <AccountBalanceIcon />
          }
        >
          Schemes
        </Button>
      </Stack>
    </Paper>
  );
}