"use client";

import Link from "next/link";

import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import SchoolRoundedIcon from "@mui/icons-material/School";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

interface QuickAction {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const actions: QuickAction[] = [
  {
    title: "Add Scheme",
    href: "/admin/schemes/create",
    icon: <AccountBalanceRoundedIcon />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <PeopleAltRoundedIcon />,
  },
  {
    title: "Marketplace",
    href: "/admin/marketplace",
    icon: <StoreRoundedIcon />,
  },
  {
    title: "Learning",
    href: "/admin/learning",
    icon: <SchoolRoundedIcon />,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: <AssessmentRoundedIcon />,
  },
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <AddCircleOutlineRoundedIcon />,
  },
];

export default function QuickActions() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{fontWeight:700,
          mb:3}}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          {actions.map((action) => (
            <Grid
              key={action.title}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <Button
                component={Link}
                href={action.href}
                variant="contained"
                fullWidth
                startIcon={action.icon}
                sx={{
                  justifyContent: "flex-start",
                  py: 2,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {action.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}