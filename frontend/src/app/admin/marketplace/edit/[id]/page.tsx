"use client";

import { useParams, useRouter } from "next/navigation";

import {
  Alert,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ProductForm from "@/src/components/admin/marketplace/ProductForm";

import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../../../redux/api/maketplaceApi";

import type {
  CreateProductPayload,
} from "@/src/types/marketplace.types";

export default function EditProductPage() {
  const router = useRouter();

  const { id } = useParams<{
    id: string;
  }>();

  const {
    data,
    isLoading,
    isError,
  } = useGetProductQuery(id);

  const [
    updateProduct,
    {
      isLoading: updating,
    },
  ] = useUpdateProductMutation();

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

      await updateProduct({
        id,
        body: formData,
      }).unwrap();

      router.push(
        "/admin/marketplace/products"
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !data?.product) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 4 }}
      >
        <Alert severity="error">
          Product not found.
        </Alert>
      </Container>
    );
  }

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
            Edit Product
          </Typography>

          <Typography
            color="text.secondary"
          >
            Update marketplace
            product details.
          </Typography>

          <ProductForm
            loading={updating}
            defaultValues={{
              name: data.product.name,
              description:
                data.product.description,
              category:
                data.product.category,
              price: data.product.price,
              stock: data.product.stock,
              status: data.product.status,
            }}
            onSubmit={handleSubmit}
          />
        </Stack>
      </Paper>
    </Container>
  );
}