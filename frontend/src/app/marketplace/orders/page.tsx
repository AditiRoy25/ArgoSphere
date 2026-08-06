"use client";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  useGetMyOrdersQuery,
} from "@/src/redux/api/maketplaceApi";

import type {
  OrderProductInfo,
} from "@/src/types/marketplace.types";

export default function OrdersPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetMyOrdersQuery();

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    console.log(
      "My Orders Error:",
      error
    );

    return (
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Alert severity="error">
          Failed to load orders.
        </Alert>
      </Container>
    );
  }

  const orders =
    data?.orders ?? [];

  // ==========================================
  // EMPTY
  // ==========================================

  if (orders.length === 0) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 8 }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
        >
          No Orders Found
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 1 }}
        >
          You have not placed any
          marketplace orders yet.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
        }}
      >
        My Orders
      </Typography>

      <Stack spacing={3}>
        {orders.map((order) => (
          <Card
            key={order._id}
            elevation={0}
            sx={{
              border:
                "1px solid #E5E7EB",
              borderRadius: 4,
            }}
          >
            <CardContent
              sx={{ p: 3 }}
            >
              <Grid
                container
                spacing={3}
              >
                {/* =========================
                    ORDER ID
                ========================= */}

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Order ID
                  </Typography>

                  <Typography
                    fontWeight={600}
                    sx={{
                      wordBreak:
                        "break-all",
                    }}
                  >
                    {order._id}
                  </Typography>
                </Grid>

                {/* =========================
                    ORDER DATE
                ========================= */}

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Ordered On
                  </Typography>

                  <Typography
                    fontWeight={600}
                  >
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString(
                      "en-IN"
                    )}
                  </Typography>
                </Grid>

                {/* =========================
                    PAYMENT STATUS
                ========================= */}

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Payment Status
                  </Typography>

                  <Chip
                    label={
                      order.paymentStatus
                    }
                    color={
                      order.paymentStatus ===
                      "paid"
                        ? "success"
                        : order.paymentStatus ===
                          "pending"
                        ? "warning"
                        : "error"
                    }
                    sx={{
                      textTransform:
                        "capitalize",
                    }}
                  />
                </Grid>

                {/* =========================
                    ORDER STATUS
                ========================= */}

                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Order Status
                  </Typography>

                  <Chip
                    label={
                      order.orderStatus
                    }
                    color={
                      order.orderStatus ===
                      "delivered"
                        ? "success"
                        : order.orderStatus ===
                          "processing"
                        ? "warning"
                        : order.orderStatus ===
                          "shipped"
                        ? "info"
                        : "error"
                    }
                    sx={{
                      textTransform:
                        "capitalize",
                    }}
                  />
                </Grid>

                {/* =========================
                    PRODUCTS
                ========================= */}

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <Divider
                    sx={{ mb: 2 }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 2 }}
                  >
                    Ordered Products
                  </Typography>

                  <Stack spacing={2}>
                    {order.products.map(
                      (
                        item,
                        index
                      ) => {
                        const product =
                          typeof item.product ===
                          "string"
                            ? null
                            : (
                                item.product as
                                  OrderProductInfo
                              );

                        return (
                          <Box
                            key={
                              product?._id ??
                              `${order._id}-${index}`
                            }
                            sx={{
                              p: 2,
                              bgcolor:
                                "#F8FAFC",
                              borderRadius: 3,
                            }}
                          >
                            <Stack
                              direction={{
                                xs: "column",
                                sm: "row",
                              }}
                              justifyContent="space-between"
                              spacing={2}
                            >
                              <Box>
                                <Typography
                                  fontWeight={
                                    700
                                  }
                                >
                                  {product
                                    ? product.name
                                    : item.product}
                                </Typography>

                                {product && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      textTransform:
                                        "capitalize",
                                    }}
                                  >
                                    {
                                      product.category
                                    }
                                  </Typography>
                                )}
                              </Box>

                              <Box>
                                <Typography
                                  variant="body2"
                                >
                                  Quantity:{" "}
                                  <strong>
                                    {
                                      item.quantity
                                    }
                                  </strong>
                                </Typography>

                                <Typography
                                  variant="body2"
                                >
                                  Price:{" "}
                                  <strong>
                                    ₹
                                    {item.price.toLocaleString(
                                      "en-IN"
                                    )}
                                  </strong>
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        );
                      }
                    )}
                  </Stack>
                </Grid>

                {/* =========================
                    TOTAL
                ========================= */}

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <Divider
                    sx={{ my: 1 }}
                  />

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                    >
                      Total Amount
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="success.main"
                    >
                      ₹
                      {order.totalAmount.toLocaleString(
                        "en-IN"
                      )}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}