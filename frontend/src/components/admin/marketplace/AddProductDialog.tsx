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

import {
  CreateProductPayload,
} from "@/src/types/marketplace.types";

import {
  useCreateProductMutation,
} from "../../../redux/api/maketplaceApi";

interface AddProductDialogProps {
  open: boolean;

  onClose: () => void;
}

export default function AddProductDialog({
  open,
  onClose,
}: AddProductDialogProps) {
  const [
    createProduct,
    {
      isLoading,
    },
  ] = useCreateProductMutation();

  const handleSubmit = async (
    values: CreateProductPayload
  ) => {
    try {
      await createProduct(
        values
      ).unwrap();

      toast.success(
        "Product created successfully."
      );

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to create product."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Add Product
      </DialogTitle>

      <DialogContent dividers>
        <ProductForm
          loading={isLoading}
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