"use client";

import { useRouter } from "next/navigation";

import {
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ProductForm from "@/src/components/admin/marketplace/ProductForm";

import {
  useCreateProductMutation,
} from "../../../../redux/api/maketplaceApi";

import type {
  CreateProductPayload,
} from "@/src/types/marketplace.types";

export default function CreateProductPage() {
  const router = useRouter();

  const [
    createProduct,
    { isLoading },
  ] = useCreateProductMutation();

  const handleSubmit = async (
    values: CreateProductPayload
  ) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append(
        "description",
        values.description
      );
      formData.append(
        "category",
        values.category
      );
      formData.append(
        "price",
        values.price.toString()
      );
      formData.append(
        "stock",
        values.stock.toString()
      );
      formData.append(
        "status",
        values.status
      );

      if (values.image) {
        formData.append(
          "image",
          values.image
        );
      }

      await createProduct(
        formData
      ).unwrap();

      router.push(
        "/admin/marketplace/products"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4 }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            sx={{ fontWeight:700}}
          >
            Add Product
          </Typography>

          <Typography
            color="text.secondary"
          >
            Create a new marketplace
            product.
          </Typography>

          <ProductForm
            loading={isLoading}
            onSubmit={handleSubmit}
          />
        </Stack>
      </Paper>
    </Container>
  );
}