"use client";

import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import ProductCard from "./ProductCard";

import {
  Product,
} from "@/types/marketplace.types";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (
    product: Product
  ) => void;
}

export default function ProductGrid({
  products,
  onAddToCart,
}: ProductGridProps) {
  if (!products.length) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
        >
          No Products Found
        </Typography>

        <Typography
          color="text.secondary"
        >
          Try another search or
          category.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={3}
    >
      {products.map((product) => (
        <Grid
          key={product._id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <ProductCard
            product={product}
            onAddToCart={
              onAddToCart
            }
          />
        </Grid>
      ))}
    </Grid>
  );
}