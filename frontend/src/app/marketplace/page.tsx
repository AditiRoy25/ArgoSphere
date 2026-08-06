"use client";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RefreshIcon from "@mui/icons-material/Refresh";

import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

import ProductCard from "@/src/components/marketplace/ProductCard";

import {
  useGetProductsQuery,
} from "@/src/redux/api/maketplaceApi";

import {
  useMemo,
  useState,
} from "react";

import type {
  ProductCategory,
} from "@/src/types/marketplace.types";

// ==========================================
// CATEGORY OPTIONS
// ==========================================

const categories: {
  label: string;
  value: ProductCategory | "all";
}[] = [
  {
    label: "All Categories",
    value: "all",
  },
  {
    label: "Tractor",
    value: "tractor",
  },
  {
    label: "Harvester",
    value: "harvester",
  },
  {
    label: "Pump",
    value: "pump",
  },
  {
    label: "Sprayer",
    value: "sprayer",
  },
  {
    label: "Tools",
    value: "tool",
  },
  {
    label: "Seeds",
    value: "seed",
  },
  {
    label: "Fertilizer",
    value: "fertilizer",
  },
];

type SortOption =
  | "latest"
  | "price-low"
  | "price-high"
  | "name";

// ==========================================
// MARKETPLACE PAGE
// ==========================================

export default function MarketplacePage() {
  // ========================================
  // STATE
  // ========================================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] =
    useState<
      ProductCategory | "all"
    >("all");

  const [
    sort,
    setSort,
  ] =
    useState<SortOption>(
      "latest"
    );

  // ========================================
  // API
  // ========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  const products =
    data?.products ?? [];

  // ========================================
  // FILTER + SORT
  // ========================================

  const filteredProducts =
    useMemo(() => {
      let result =
        [...products];

      // Only show active/available
      result =
        result.filter(
          (product) =>
            product.status !==
            "inactive"
        );

      // Search
      if (search.trim()) {
        const searchText =
          search
            .trim()
            .toLowerCase();

        result =
          result.filter(
            (product) =>
              product.name
                .toLowerCase()
                .includes(
                  searchText
                ) ||
              product.brand
                ?.toLowerCase()
                .includes(
                  searchText
                ) ||
              product.category
                .toLowerCase()
                .includes(
                  searchText
                )
          );
      }

      // Category
      if (
        category !== "all"
      ) {
        result =
          result.filter(
            (product) =>
              product.category ===
              category
          );
      }

      // Sort
      switch (sort) {
        case "price-low":
          result.sort(
            (a, b) =>
              a.price -
              b.price
          );
          break;

        case "price-high":
          result.sort(
            (a, b) =>
              b.price -
              a.price
          );
          break;

        case "name":
          result.sort(
            (a, b) =>
              a.name.localeCompare(
                b.name
              )
          );
          break;

        case "latest":
        default:
          result.sort(
            (a, b) =>
              new Date(
                b.createdAt
              ).getTime() -
              new Date(
                a.createdAt
              ).getTime()
          );
      }

      return result;
    }, [
      products,
      search,
      category,
      sort,
    ]);

  // ========================================
  // RESET FILTERS
  // ========================================

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setSort("latest");
  };

  // ========================================
  // UI
  // ========================================

  return (
    <>
      <Navbar />

      <Box
        component="main"
        sx={{
          minHeight:
            "calc(100vh - 100px)",
          bgcolor: "#F8FAF5",
        }}
      >
        {/* ==================================
            HERO
        ================================== */}

        <Box
          sx={{
            background:
              "linear-gradient(135deg, #14532D 0%, #15803D 55%, #22C55E 100%)",
            color: "#fff",
            py: {
              xs: 6,
              md: 8,
            },
          }}
        >
          <Container maxWidth="xl">
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              justifyContent="space-between"
              alignItems={{
                xs: "flex-start",
                md: "center",
              }}
              spacing={4}
            >
              <Box
                sx={{
                  maxWidth: 750,
                }}
              >
                <Chip
                  icon={
                    <StorefrontIcon />
                  }
                  label="AgroSphere Marketplace"
                  sx={{
                    mb: 2,
                    bgcolor:
                      "rgba(255,255,255,0.15)",
                    color: "#fff",

                    "& .MuiChip-icon":
                      {
                        color:
                          "#fff",
                      },
                  }}
                />

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: {
                      xs: "2.2rem",
                      md: "3.5rem",
                    },
                  }}
                >
                  Agricultural
                  Marketplace
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    maxWidth: 650,
                    fontSize:
                      "1.05rem",
                    color:
                      "rgba(255,255,255,0.88)",
                    lineHeight: 1.8,
                  }}
                >
                  Discover farming
                  equipment, seeds,
                  fertilizers, tools and
                  other agricultural
                  products for modern
                  farming.
                </Typography>
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* ==================================
            MARKETPLACE CONTENT
        ================================== */}

        <Container
          maxWidth="xl"
          sx={{
            py: {
              xs: 4,
              md: 6,
            },
          }}
        >
          {/* ==================================
              SEARCH + FILTERS
          ================================== */}

          <Box
            sx={{
              bgcolor: "#fff",
              border:
                "1px solid #E5E7EB",
              borderRadius: 4,
              p: {
                xs: 2,
                md: 3,
              },
              mb: 4,
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
            >
              {/* SEARCH */}

              <Grid
                size={{
                  xs: 12,
                  md: 5,
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search products, brand or category..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  slotProps={{
                    input: {
                      startAdornment:
                        (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                    },
                  }}
                />
              </Grid>

              {/* CATEGORY */}

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <FormControl
                  fullWidth
                >
                  <InputLabel>
                    Category
                  </InputLabel>

                  <Select
                    label="Category"
                    value={
                      category
                    }
                    onChange={(e) =>
                      setCategory(
                        e.target
                          .value as
                          | ProductCategory
                          | "all"
                      )
                    }
                  >
                    {categories.map(
                      (item) => (
                        <MenuItem
                          key={
                            item.value
                          }
                          value={
                            item.value
                          }
                        >
                          {
                            item.label
                          }
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {/* SORT */}

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 2,
                }}
              >
                <FormControl
                  fullWidth
                >
                  <InputLabel>
                    Sort By
                  </InputLabel>

                  <Select
                    label="Sort By"
                    value={sort}
                    onChange={(e) =>
                      setSort(
                        e.target
                          .value as
                          SortOption
                      )
                    }
                  >
                    <MenuItem value="latest">
                      Latest
                    </MenuItem>

                    <MenuItem value="price-low">
                      Price: Low to
                      High
                    </MenuItem>

                    <MenuItem value="price-high">
                      Price: High to
                      Low
                    </MenuItem>

                    <MenuItem value="name">
                      Name
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* RESET */}

              <Grid
                size={{
                  xs: 12,
                  md: 2,
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  startIcon={
                    <RefreshIcon />
                  }
                  onClick={
                    handleReset
                  }
                  sx={{
                    height: 56,
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* ==================================
              HEADER
          ================================== */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            spacing={2}
            sx={{
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
              >
                Products
              </Typography>

              {!isLoading &&
                !isError && (
                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                    }}
                  >
                    Showing{" "}
                    {
                      filteredProducts.length
                    }{" "}
                    of{" "}
                    {
                      products.length
                    }{" "}
                    products
                  </Typography>
                )}
            </Box>

            {isFetching &&
              !isLoading && (
                <CircularProgress
                  size={24}
                  color="success"
                />
              )}
          </Stack>

          {/* ==================================
              LOADING
          ================================== */}

          {isLoading && (
            <Box
              sx={{
                minHeight: 350,
                display: "flex",
                flexDirection:
                  "column",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                gap: 2,
              }}
            >
              <CircularProgress
                color="success"
              />

              <Typography
                color="text.secondary"
              >
                Loading marketplace
                products...
              </Typography>
            </Box>
          )}

          {/* ==================================
              API ERROR
          ================================== */}

          {isError && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 3,
              }}
              action={
                <Button
                  color="inherit"
                  onClick={() =>
                    refetch()
                  }
                >
                  Retry
                </Button>
              }
            >
              Failed to load
              marketplace products.

              {process.env
                .NODE_ENV ===
                "development" && (
                <Box
                  component="span"
                  sx={{
                    display:
                      "block",
                    mt: 0.5,
                    fontSize:
                      "0.8rem",
                  }}
                >
                  {JSON.stringify(
                    error
                  )}
                </Box>
              )}
            </Alert>
          )}

          {/* ==================================
              DATABASE EMPTY
          ================================== */}

          {!isLoading &&
            !isError &&
            products.length ===
              0 && (
              <Box
                sx={{
                  bgcolor: "#fff",
                  border:
                    "1px solid #E5E7EB",
                  borderRadius: 4,
                  py: 10,
                  px: 3,
                  textAlign:
                    "center",
                }}
              >
                <StorefrontIcon
                  sx={{
                    fontSize: 70,
                    color:
                      "text.disabled",
                    mb: 2,
                  }}
                />

                <Typography
                  variant="h5"
                  fontWeight={700}
                >
                  No Products
                  Available
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    maxWidth: 500,
                    mx: "auto",
                  }}
                >
                  Marketplace
                  products have not
                  been added yet.
                  Please check again
                  later.
                </Typography>
              </Box>
            )}

          {/* ==================================
              FILTER EMPTY
          ================================== */}

          {!isLoading &&
            !isError &&
            products.length > 0 &&
            filteredProducts.length ===
              0 && (
              <Alert
                severity="info"
                sx={{
                  borderRadius: 3,
                }}
                action={
                  <Button
                    color="inherit"
                    onClick={
                      handleReset
                    }
                  >
                    Clear Filters
                  </Button>
                }
              >
                No products match
                your search or
                selected category.
              </Alert>
            )}

          {/* ==================================
              PRODUCT GRID
          ================================== */}

          {!isLoading &&
            !isError &&
            filteredProducts.length >
              0 && (
              <Grid
                container
                spacing={3}
              >
                {filteredProducts.map(
                  (product) => (
                    <Grid
                      key={
                        product._id
                      }
                      size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                      }}
                    >
                      <ProductCard
                        product={
                          product
                        }
                      />
                    </Grid>
                  )
                )}
              </Grid>
            )}
        </Container>
      </Box>

      <Footer />
    </>
  );
}