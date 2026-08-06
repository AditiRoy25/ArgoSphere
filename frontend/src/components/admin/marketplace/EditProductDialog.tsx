"use client";

import * as React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { toast } from "sonner";

import ProductForm from "./ProductForm";

import type {
  Product,
  CreateProductPayload,
} from "@/src/types/marketplace.types";

import {
  useUpdateProductMutation,
} from "../../../redux/api/maketplaceApi";

interface EditProductDialogProps {
  open: boolean;

  product: Product | null;

  onClose: () => void;
}

export default function EditProductDialog({
  open,
  product,
  onClose,
}: EditProductDialogProps) {
  const [
    updateProduct,
    {
      isLoading,
    },
  ] = useUpdateProductMutation();

  const handleSubmit = async (
    values: CreateProductPayload
  ) => {
    if (!product) return;

    try {
      await updateProduct({
        id: product._id,
        body: values,
      }).unwrap();

      toast.success(
        "Product updated successfully."
      );

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to update product."
      );
    }
  };

  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Edit Product
      </DialogTitle>

      <DialogContent dividers>
        <ProductForm
          loading={isLoading}
          defaultValues={{
            name: product.name,
            description:
              product.description,
            category:
              product.category,
            price: product.price,
            stock: product.stock,
            // status: product.status,
           image: product.images?.[0] ?? "",
          }}
          onSubmit={handleSubmit}
        />
      </DialogContent>

      <DialogActions>
        <Button
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}