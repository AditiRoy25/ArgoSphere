"use client";

import * as React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

import type {
  Order,
} from "@/src/types/marketplace.types";

interface OrderDetailsDialogProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailsDialog({
  open,
  order,
  onClose,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Order Details
      </DialogTitle>

      <DialogContent dividers>
        <Grid
          container
          spacing={3}
        >
          <Grid size={{ xs: 12 }}>
            <Typography>
              <strong>Order ID:</strong>{" "}
              {order._id}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography>
              <strong>Farmer ID:</strong>{" "}
              {order.farmer}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography>
              <strong>Total Amount:</strong>{" "}
              ₹{order.totalAmount}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography
              component="div"
            >
              <strong>Payment:</strong>{" "}
              <Chip
                size="small"
                label={order.paymentStatus}
                color={
                  order.paymentStatus ===
                  "paid"
                    ? "success"
                    : order.paymentStatus ===
                      "failed"
                    ? "error"
                    : "warning"
                }
              />
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography
              component="div"
            >
              <strong>Order Status:</strong>{" "}
              <Chip
                size="small"
                label={order.orderStatus}
                color={
                  order.orderStatus ===
                  "delivered"
                    ? "success"
                    : order.orderStatus ===
                      "cancelled"
                    ? "error"
                    : order.orderStatus ===
                      "processing"
                    ? "warning"
                    : "info"
                }
              />
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography>
              <strong>Created:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Ordered Products
            </Typography>

            <Paper
              variant="outlined"
              sx={{ mt: 1 }}
            >
              <List dense>
                {order.products.map(
                  (item, index) => (
                    <ListItem
                      key={index}
                      divider={
                        index <
                        order.products.length -
                          1
                      }
                    >
                      <ListItemText
                        primary={`Product ID: ${item.product}`}
                        secondary={`Quantity: ${item.quantity} • Price: ₹${item.price}`}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}