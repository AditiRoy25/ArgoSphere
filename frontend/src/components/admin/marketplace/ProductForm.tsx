"use client";

import * as React from "react";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Controller,
  useForm,
} from "react-hook-form";

import type {
  CreateProductPayload,
} from "@/src/types/marketplace.types";

// ==========================================
// PROPS
// ==========================================

interface ProductFormProps {
  defaultValues?:
    Partial<CreateProductPayload>;

  loading?: boolean;

  onSubmit: (
    values: CreateProductPayload
  ) => void;
}

// ==========================================
// INITIAL VALUES
// ==========================================

const initialValues:
  CreateProductPayload = {

  name: "",

  description: "",

  category: "seed",

  brand: "",

  price: 0,

  stock: 0,

  status: "available",

  images: [],
};

// ==========================================
// COMPONENT
// ==========================================

export default function ProductForm({
  defaultValues,
  loading = false,
  onSubmit,
}: ProductFormProps) {

  // ========================================
  // IMAGE PREVIEWS
  // ========================================

  const [
    previews,
    setPreviews,
  ] =
    React.useState<string[]>(
      []
    );

  // ========================================
  // FORM
  // ========================================

  const {
    register,
    control,
    handleSubmit,

    formState: {
      errors,
    },

  } =
    useForm<CreateProductPayload>({
      defaultValues: {
        ...initialValues,
        ...defaultValues,
      },
    });

  // ========================================
  // CLEAN PREVIEW URLs
  // ========================================

  React.useEffect(() => {

    return () => {

      previews.forEach(
        (url) => {
          URL.revokeObjectURL(
            url
          );
        }
      );

    };

  }, [previews]);

  // ========================================
  // UI
  // ========================================

  return (

    <Box
      component="form"
      onSubmit={
        handleSubmit(
          onSubmit
        )
      }
    >

      <Grid
        container
        spacing={2}
      >

        {/* ==================================
            PRODUCT NAME
        ================================== */}

        <Grid
          size={{
            xs: 12,
          }}
        >

          <TextField
            label="Product Name"
            fullWidth

            error={
              !!errors.name
            }

            helperText={
              errors.name
                ?.message
            }

            {...register(
              "name",
              {
                required:
                  "Product name is required",

                minLength: {
                  value: 3,

                  message:
                    "Minimum 3 characters",
                },
              }
            )}
          />

        </Grid>

        {/* ==================================
            DESCRIPTION
        ================================== */}

        <Grid
          size={{
            xs: 12,
          }}
        >

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth

            error={
              !!errors.description
            }

            helperText={
              errors.description
                ?.message
            }

            {...register(
              "description",
              {
                required:
                  "Description is required",
              }
            )}
          />

        </Grid>

        {/* ==================================
            CATEGORY
        ================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >

          <Controller
            name="category"

            control={
              control
            }

            rules={{
              required:
                "Category is required",
            }}

            render={({
              field,
            }) => (

              <TextField
                {...field}

                select

                label="Category"

                fullWidth

                error={
                  !!errors.category
                }

                helperText={
                  errors.category
                    ?.message
                }
              >

                <MenuItem value="seed">
                  Seed
                </MenuItem>

                <MenuItem value="fertilizer">
                  Fertilizer
                </MenuItem>

                <MenuItem value="tractor">
                  Tractor
                </MenuItem>

                <MenuItem value="harvester">
                  Harvester
                </MenuItem>

                <MenuItem value="pump">
                  Pump
                </MenuItem>

                <MenuItem value="sprayer">
                  Sprayer
                </MenuItem>

                <MenuItem value="tool">
                  Tool
                </MenuItem>

              </TextField>

            )}
          />

        </Grid>

        {/* ==================================
            BRAND
        ================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >

          <TextField
            label="Brand"
            fullWidth

            {...register(
              "brand"
            )}
          />

        </Grid>

        {/* ==================================
            PRICE
        ================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >

          <TextField
            label="Price"

            type="number"

            fullWidth

            error={
              !!errors.price
            }

            helperText={
              errors.price
                ?.message
            }

            {...register(
              "price",
              {
                required:
                  "Price is required",

                valueAsNumber:
                  true,

                min: {
                  value: 1,

                  message:
                    "Price must be greater than 0",
                },
              }
            )}
          />

        </Grid>

        {/* ==================================
            STOCK
        ================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >

          <TextField
            label="Stock"

            type="number"

            fullWidth

            error={
              !!errors.stock
            }

            helperText={
              errors.stock
                ?.message
            }

            {...register(
              "stock",
              {
                required:
                  "Stock is required",

                valueAsNumber:
                  true,

                min: {
                  value: 0,

                  message:
                    "Stock cannot be negative",
                },
              }
            )}
          />

        </Grid>

        {/* ==================================
            STATUS
        ================================== */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >

          <Controller
            name="status"

            control={
              control
            }

            render={({
              field,
            }) => (

              <TextField
                {...field}

                select

                label="Status"

                fullWidth
              >

                <MenuItem
                  value="available"
                >
                  Available
                </MenuItem>

                <MenuItem
                  value="out_of_stock"
                >
                  Out of Stock
                </MenuItem>

                <MenuItem
                  value="inactive"
                >
                  Inactive
                </MenuItem>

              </TextField>

            )}
          />

        </Grid>

        {/* ==================================
            IMAGES
        ================================== */}

        <Grid
          size={{
            xs: 12,
          }}
        >

          <Controller
            name="images"

            control={
              control
            }

            rules={{
              validate: (
                files
              ) => {

                if (
                  !files ||
                  files.length ===
                    0
                ) {

                  return "At least one product image is required";

                }

                if (
                  files.length > 5
                ) {

                  return "Maximum 5 images are allowed";

                }

                return true;
              },
            }}

            render={({
              field: {
                onChange,
              },
            }) => (

              <Stack
                spacing={2}
              >

                <Typography
                  variant="body2"
                  fontWeight={600}
                >
                  Product Images
                </Typography>

                <Button
                  component="label"

                  variant="outlined"
                >

                  Select Images

                  <input
                    hidden

                    multiple

                    type="file"

                    accept="
                      image/jpeg,
                      image/png,
                      image/webp
                    "

                    onChange={(
                      e
                    ) => {

                      const files =
                        Array.from(
                          e.target
                            .files ??
                            []
                        );

                      // ========================
                      // Save files to RHF
                      // ========================

                      onChange(
                        files
                      );

                      // ========================
                      // Remove previous URLs
                      // ========================

                      previews.forEach(
                        (url) => {

                          URL
                            .revokeObjectURL(
                              url
                            );

                        }
                      );

                      // ========================
                      // Generate previews
                      // ========================

                      const urls =
                        files.map(
                          (file) =>
                            URL
                              .createObjectURL(
                                file
                              )
                        );

                      setPreviews(
                        urls
                      );

                    }}
                  />

                </Button>

                {/* ERROR */}

                {errors.images && (

                  <Typography
                    color="error"

                    variant="body2"
                  >
                    {
                      errors.images
                        .message
                    }
                  </Typography>

                )}

                {/* IMAGE PREVIEWS */}

                {previews.length >
                  0 && (

                  <Stack
                    direction="row"

                    spacing={2}

                    flexWrap="wrap"

                    useFlexGap
                  >

                    {previews.map(
                      (
                        preview,
                        index
                      ) => (

                        <Box
                          key={
                            preview
                          }

                          component="img"

                          src={
                            preview
                          }

                          alt={
                            `Product preview ${
                              index +
                              1
                            }`
                          }

                          sx={{
                            width: 150,

                            height: 120,

                            objectFit:
                              "cover",

                            borderRadius:
                              2,

                            border:
                              "1px solid #E5E7EB",
                          }}
                        />

                      )
                    )}

                  </Stack>

                )}

              </Stack>

            )}
          />

        </Grid>

      </Grid>

      {/* ====================================
          SUBMIT
      ==================================== */}

      <Stack
        direction="row"

        justifyContent="flex-end"

        spacing={2}

        mt={4}
      >

        <Button
          type="submit"

          variant="contained"

          color="success"

          disabled={
            loading
          }
        >

          {
            loading
              ? "Saving..."
              : "Save Product"
          }

        </Button>

      </Stack>

    </Box>

  );
}