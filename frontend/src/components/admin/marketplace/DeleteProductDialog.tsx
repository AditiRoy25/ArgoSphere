"use client";

import * as React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { toast } from "sonner";

import type {
  Product,
} from "@/src/types/marketplace.types";

import {
  useDeleteProductMutation,
} from "../../../redux/api/maketplaceApi";

interface DeleteProductDialogProps {
  open: boolean;

  product: Product | null;

  onClose: () => void;
}

export default function DeleteProductDialog({
  open,
  product,
  onClose,
}: DeleteProductDialogProps) {
  const [
    deleteProduct,
    {
      isLoading,
    },
  ] = useDeleteProductMutation();

  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteProduct(
        product._id
      ).unwrap();

      toast.success(
        "Product deleted successfully."
      );

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Delete Product
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete
          <strong>
            {" "}
            {product?.name}
          </strong>
          ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          loading={isLoading}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}