"use client";

import {
  Alert,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import {
  useRouter,
} from "next/navigation";

import ProductForm from
  "@/src/components/marketplace/ProductForm";

import {
  useCreateProductMutation,
} from "@/src/redux/api/maketplaceApi";

import type {
  CreateProductPayload,
} from "@/src/types/marketplace.types";

export default function CreateProductPage() {

  const router =
    useRouter();

  const [
    createProduct,
    {
      isLoading,
      isError,
    },
  ] =
    useCreateProductMutation();

  // ========================================
  // CREATE PRODUCT
  // ========================================

  const handleCreate =
    async (
      values:
        CreateProductPayload
    ) => {

      try {

        // ==================================
        // FORM DATA
        // ==================================

        const formData =
          new FormData();

        formData.append(
          "name",
          values.name
        );

        formData.append(
          "description",
          values.description
        );

        formData.append(
          "category",
          values.category
        );

        formData.append(
          "brand",
          values.brand ?? ""
        );

        formData.append(
          "price",
          String(
            values.price
          )
        );

        formData.append(
          "stock",
          String(
            values.stock
          )
        );

        formData.append(
          "status",
          values.status
        );

        // ==================================
        // IMAGES
        // THIS IS IMPORTANT
        // ==================================

        values.images.forEach(
          (file) => {

            formData.append(
              "images",
              file
            );

          }
        );

        // ==================================
        // DEBUG
        // ==================================

        for (
          const [
            key,
            value,
          ] of formData.entries()
        ) {

          console.log(
            key,
            value
          );

        }

        // ==================================
        // API
        // ==================================

        await createProduct(
          formData
        ).unwrap();

        router.push(
          "/admin/marketplace/products"
        );

      } catch (error) {

        console.error(
          "CREATE PRODUCT:",
          error
        );

      }

    };

  return (

    <Container
      maxWidth="md"
      sx={{
        py: 5,
      }}
    >

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Add Product
      </Typography>

      {isError && (

        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          Failed to create
          product.
        </Alert>

      )}

      <Card>

        <CardContent>

          <ProductForm
            loading={
              isLoading
            }

            onSubmit={
              handleCreate
            }
          />

        </CardContent>

      </Card>

    </Container>

  );

}