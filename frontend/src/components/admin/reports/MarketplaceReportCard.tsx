"use client";

import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { useGetMarketplaceReportQuery } from "@/src/redux/api/reportApi";

export default function MarketplaceReportCard() {
  const {
    data,
    isLoading,
    isError,
  } = useGetMarketplaceReportQuery();

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

  if (isError || !data?.report) {
    return (
      <Alert severity="error">
        Failed to load marketplace report.
      </Alert>
    );
  }

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <CurrencyRupeeIcon
                color="success"
                fontSize="large"
              />

              <Typography color="text.secondary">
                Marketplace Revenue
              </Typography>

              <Typography
                variant="h4"
               sx={{ fontWeight:700}}
              >
                ₹{data.report.totalRevenue}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
      >
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <ShoppingCartIcon
                color="primary"
                fontSize="large"
              />

              <Typography color="text.secondary">
                Marketplace Orders
              </Typography>

              <Typography
                variant="h4"
                 sx={{ fontWeight:700}}
              >
                {data.report.totalOrders}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}