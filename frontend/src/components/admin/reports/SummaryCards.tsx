"use client";

import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import GrassIcon from "@mui/icons-material/Grass";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaymentsIcon from "@mui/icons-material/Payments";
import ScienceIcon from "@mui/icons-material/Science";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { useGetDashboardSummaryQuery } from "@/src/redux/api/reportApi";

export default function SummaryCards() {
  const {
    data,
    isLoading,
    isError,
  } = useGetDashboardSummaryQuery();

  if (isLoading) {
    return (
      <Stack
         sx={{ alignItems:"center",
        py:5}}
      
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (isError || !data?.summary) {
    return (
      <Typography color="error">
        Failed to load dashboard summary.
      </Typography>
    );
  }

  const summary = data.summary;

  const cards = [
    {
      title: "Farmers",
      value: summary.totalFarmers,
      icon: <GroupsIcon color="primary" fontSize="large" />,
    },
    {
      title: "Farms",
      value: summary.totalFarms,
      icon: <AgricultureIcon color="success" fontSize="large" />,
    },
    {
      title: "Seeds",
      value: summary.totalSeeds,
      icon: <GrassIcon color="warning" fontSize="large" />,
    },
    {
      title: "Fertilizers",
      value: summary.totalFertilizers,
      icon: <ScienceIcon color="secondary" fontSize="large" />,
    },
    {
      title: "Marketplace Products",
      value: summary.totalMarketplaceProducts,
      icon: <StorefrontIcon color="primary" fontSize="large" />,
    },
    {
      title: "Marketplace Orders",
      value: summary.totalMarketplaceOrders,
      icon: <ShoppingCartIcon color="success" fontSize="large" />,
    },
    {
      title: "NGOs",
      value: summary.totalNGOs,
      icon: <GroupsIcon color="info" fontSize="large" />,
    },
    {
      title: "Allowances",
      value: summary.totalAllowances,
      icon: (
        <AssignmentTurnedInIcon
          color="warning"
          fontSize="large"
        />
      ),
    },
  ];

  return (
    <Grid
      container
      spacing={3}
    >
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <Card>
            <CardContent>
              <Stack spacing={2}>
                {card.icon}

                <Typography
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{fontWeight:700}}
                >
                  {card.value}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}