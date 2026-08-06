"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";

import HeroBanner from "../../../components/marketplace/HeroBanner";
import SearchBar from "../../../components/marketplace/SearchBar";
import CategorySidebar from "../../../components/marketplace/CategorySidebar";
import CategoryCards from "../../../components/marketplace/CategoryCards";
import ProductGrid from "../../../components/marketplace/ProductGrid";
import ProductSkeleton from "../../../components/marketplace/ProductSkeleton";
import FeatureSection from "../../../components/marketplace/FeatureSection";
import FilterDrawer from "../../../components/marketplace/FilterDrawer";

import {
  Product,
  ProductCategory,
  ProductStatus,
} from "../../../types/marketplace.types";

import { useGetProductsQuery } from "../../../redux/api/maketplaceApi";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState<ProductCategory | "">("");

  const [status, setStatus] =
    useState<ProductStatus | "">("");

  const [sort, setSort] =
    useState("");

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const {
    data,
    isLoading,
  } = useGetProductsQuery({
    search,
    category,
  });

  const handleAddToCart = (
    product: Product
  ) => {
    console.log(product);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <Stack spacing={5}>
        <HeroBanner />

        <SearchBar
          onSearch={setSearch}
        />

        <CategoryCards
          selectedCategory={
            category
          }
          onCategoryChange={
            setCategory
          }
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Marketplace
          </Typography>

          <Button
            variant="outlined"
            startIcon={
              <FilterListIcon />
            }
            onClick={() =>
              setDrawerOpen(true)
            }
          >
            Filters
          </Button>
        </Stack>

        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <CategorySidebar
              selectedCategory={
                category
              }
              onCategoryChange={
                setCategory
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 9,
            }}
          >
            {isLoading ? (
              <ProductSkeleton
                count={8}
              />
            ) : (
              <ProductGrid
                products={
                  data?.products ??
                  []
                }
                onAddToCart={
                  handleAddToCart
                }
              />
            )}
          </Grid>
        </Grid>

        <FeatureSection />
      </Stack>

      <FilterDrawer
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
        category={category}
        status={status}
        sort={sort}
        onCategoryChange={
          setCategory
        }
        onStatusChange={
          setStatus
        }
        onSortChange={
          setSort
        }
        onReset={() => {
          setCategory("");
          setStatus("");
          setSort("");
        }}
      />
    </Container>
  );
}