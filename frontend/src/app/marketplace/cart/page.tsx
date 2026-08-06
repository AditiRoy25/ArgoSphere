"use client";

import { useParams } from "next/navigation";

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useGetProductQuery } from "@/redux/api/marketplaceApi";

export default function ProductDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data,
    isLoading,
    isError,
  } = useGetProductQuery(id);

  if (isLoading) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography>
          Loading product...
        </Typography>
      </Container>
    );
  }

  if (isError || !data?.product) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography color="error">
          Product not found.
        </Typography>
      </Container>
    );
  }

  const product = data.product;

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Grid
        container
        spacing={5}
      >
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >
            <Box
              component="img"
              src={
                product.images?.[0] ??
                "/images/product-placeholder.png"
              }
              alt={product.name}
              sx={{
                width: "100%",
                height: 450,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Paper>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              {product.name}
            </Typography>

            <Chip
              label={product.status}
              color={
                product.status === "available"
                  ? "success"
                  : product.status ===
                    "out_of_stock"
                  ? "warning"
                  : "default"
              }
              sx={{
                width: "fit-content",
              }}
            />

            {product.brand && (
              <Typography>
                <strong>Brand:</strong>{" "}
                {product.brand}
              </Typography>
            )}

            <Typography>
              <strong>Category:</strong>{" "}
              {product.category}
            </Typography>

            <Typography>
              <strong>Stock:</strong>{" "}
              {product.stock}
            </Typography>

            <Typography
              variant="h4"
              color="primary.main"
              fontWeight={700}
            >
              ₹
              {product.price.toLocaleString()}
            </Typography>

            <Divider />

            <Typography
              color="text.secondary"
            >
              {product.description}
            </Typography>

            {product.specifications &&
              Object.keys(
                product.specifications
              ).length > 0 && (
                <>
                  <Divider />

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Specifications
                  </Typography>

                  <Stack spacing={1}>
                    {Object.entries(
                      product.specifications
                    ).map(
                      ([key, value]) => (
                        <Typography
                          key={key}
                        >
                          <strong>
                            {key}
                          </strong>
                          : {value}
                        </Typography>
                      )
                    )}
                  </Stack>
                </>
              )}

            <Button
              variant="contained"
              size="large"
              startIcon={
                <ShoppingCartIcon />
              }
              disabled={
                product.status !==
                "available"
              }
            >
              Add To Cart
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}