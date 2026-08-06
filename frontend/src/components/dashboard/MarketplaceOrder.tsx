"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useGetMyOrdersQuery } from "@/src/redux/api/maketplaceApi";
import type { Order } from "@/src/types/marketplace.types";

export default function MarketplaceOrders() {
  const {
    data,
    isLoading,
    isError,
  } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        <CardContent>
          <Stack
            sx={{ alignItems: "center", py: 5 }}
          >
            <CircularProgress />
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load marketplace orders.
      </Alert>
    );
  }

  const orders = data?.orders || [];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
      }}
    >
      <CardContent>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Stack
            spacing={1}
            sx={{ flexDirection: "row", alignItems: "center" }}
          >
            <ShoppingCartOutlinedIcon
              color="success"
            />

            <Typography
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              Marketplace Orders
            </Typography>
          </Stack>

          <Button
            component={Link}
            href="/farmer/orders"
            size="small"
          >
            View All
          </Button>
        </Stack>

        {orders.length === 0 ? (
          <Box sx={{ py: 5 }}>
            <Typography
              sx={{ textAlign: "center" }}
              color="text.secondary"
            >
              No orders found.
            </Typography>
          </Box>
        ) : (
          orders.slice(0, 5).map((order: Order, index: number) => (
            <Box key={order._id}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontWeight: 600 }}
                  >
                    Order #{order._id.slice(-6)}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {order.products.length} item{order.products.length === 1 ? "" : "s"}
                  </Typography>
                </Box>

                <Stack
                  spacing={1}
                  sx={{ alignItems: "flex-end" }}
                >
                  <Typography
                    sx={{ fontWeight: 700 }}
                  >
                    ${order.totalAmount}
                  </Typography>

                  <Chip
                    size="small"
                    label={order.orderStatus}
                    color={
                      order.orderStatus === "delivered"
                        ? "success"
                        : order.orderStatus === "processing" || order.orderStatus === "shipped"
                        ? "warning"
                        : order.orderStatus === "cancelled"
                        ? "error"
                        : "info"
                    }
                  />
                </Stack>
              </Stack>

              {index !== orders.length - 1 && (
                <Divider />
              )}
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
