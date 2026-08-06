"use client";

import * as React from "react";

import Link from "next/link";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import ProductTable from "../../../../components/admin/marketplace/ProductTable";
import EditProductDialog from "../../../../components/admin/marketplace/EditProductDialog";
import DeleteProductDialog from "../../../../components/admin/marketplace/DeleteProductDialog";

import {
  useGetProductsQuery,
} from "../../../../redux/api/maketplaceApi";

import type {
  Product,
} from "@/src/types/marketplace.types";

export default function MarketplaceProductsPage() {
  const [search, setSearch] =
    React.useState("");

  const [category, setCategory] =
    React.useState("");

  const [status, setStatus] =
    React.useState("");

  const [selectedProduct, setSelectedProduct] =
    React.useState<Product | null>(null);

  const [openEdit, setOpenEdit] =
    React.useState(false);

  const [openDelete, setOpenDelete] =
    React.useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();

  const products = React.useMemo(() => {
    let rows = data?.products ?? [];

    if (search) {
      rows = rows.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category) {
      rows = rows.filter(
        (product) =>
          product.category === category
      );
    }

    if (status) {
      rows = rows.filter(
        (product) =>
          product.status === status
      );
    }

    return rows;
  }, [
    data,
    search,
    category,
    status,
  ]);

  const handleView = (
    product: Product
  ) => {
    console.log(product);
  };

  const handleEdit = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleDelete = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  return (
    <Box>

      <Stack
        sx={{direction:"row",
        justifyContent:"space-between",
        alignItems:"center",
        mb:3}}
      >
        <Typography
          variant="h4"
          sx={{fontWeight:700}}
        >
          Marketplace Products
        </Typography>

        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={refetch}
          >
            Refresh
          </Button>

          <Link
            href="/admin/marketplace/create"
            style={{
              textDecoration:
                "none",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Product
            </Button>
          </Link>
        </Stack>
      </Stack>

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <TextField
            fullWidth
            label="Search Product"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <TextField
            select
            label="Category"
            value={category}
            sx={{
              minWidth: 180,
            }}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >
            <MenuItem value="">
              All
            </MenuItem>

            <MenuItem value="Seed">
              Seed
            </MenuItem>

            <MenuItem value="Fertilizer">
              Fertilizer
            </MenuItem>

            <MenuItem value="Equipment">
              Equipment
            </MenuItem>
          </TextField>

          <TextField
            select
            label="Status"
            value={status}
            sx={{
              minWidth: 180,
            }}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
          >
            <MenuItem value="">
              All
            </MenuItem>

            <MenuItem value="Available">
              Available
            </MenuItem>

            <MenuItem value="Out of Stock">
              Out of Stock
            </MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <ProductTable
          rows={products}
          loading={isLoading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      <EditProductDialog
        open={openEdit}
        product={selectedProduct}
        onClose={() => {
          setOpenEdit(false);
          setSelectedProduct(
            null
          );
        }}
      />

      <DeleteProductDialog
        open={openDelete}
        product={selectedProduct}
        onClose={() => {
          setOpenDelete(false);
          setSelectedProduct(
            null
          );
        }}
      />

      {isError && (
        <Typography
          color="error"
        sx={{  mt:2}}
        >
          Failed to load products.
        </Typography>
      )}
    </Box>
  );
}