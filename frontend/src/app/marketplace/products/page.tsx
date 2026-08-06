"use client";

import { useState } from "react";

import {
  // Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import ProductTable from "../../../components/admin/marketplace/ProductTable";
import AddProductDialog from "../../../components/admin/marketplace/AddProductDialog";
import EditProductDialog from "../../../components/admin/marketplace/EditProductDialog";
import DeleteProductDialog from "../../../components/admin/marketplace/DeleteProductDialog";

import {
  Product,
} from "../../../types/marketplace.types";

import {
  useGetProductsQuery,
} from "../../../redux/api/maketplaceApi";

export default function ProductsPage() {
  const {
    data,
    isLoading,
  } = useGetProductsQuery();

  const [openAdd, setOpenAdd] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <Stack
       sx={{ direction:"row",
        justifyContent:"space-between",
        alignItems:"center",
        mb:3}}
      >
        <Typography
          variant="h4"
         sx={{ fontWeight:700}}
        >
          Manage Products
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            setOpenAdd(true)
          }
        >
          Add Product
        </Button>
      </Stack>

      <ProductTable
  loading={isLoading}
  rows={data?.products ?? []}
  onView={(product) => {
    console.log(product);
  }}
  onEdit={(product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  }}
  onDelete={(product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  }}
/>

      <AddProductDialog
        open={openAdd}
        onClose={() =>
          setOpenAdd(false)
        }
      />

      {selectedProduct && (
        <>
          <EditProductDialog
            open={openEdit}
            product={selectedProduct}
            onClose={() => {
              setOpenEdit(false);
              setSelectedProduct(null);
            }}
          />

          <DeleteProductDialog
            open={openDelete}
            product={selectedProduct}
            onClose={() => {
              setOpenDelete(false);
              setSelectedProduct(null);
            }}
          />
        </>
      )}
    </Container>
  );
}