"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartOutlinedIcon from
  "@mui/icons-material/ShoppingCartOutlined";

import VisibilityOutlinedIcon from
  "@mui/icons-material/VisibilityOutlined";

import type {
  Product,
} from "@/src/types/marketplace.types";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const image =
    product.images?.[0];

  const isOutOfStock =
    product.stock <= 0 ||
    product.status ===
      "out_of_stock";

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",

        border:
          "1px solid #E5E7EB",

        borderRadius: 4,

        overflow: "hidden",

        transition:
          "0.25s ease",

        "&:hover": {
          transform:
            "translateY(-4px)",

          boxShadow:
            "0 12px 30px rgba(0,0,0,0.08)",
        },
      }}
    >
      {/* IMAGE */}

      <Box
        sx={{
          position: "relative",
          height: 210,
          bgcolor: "#F3F4F6",
          overflow: "hidden",
        }}
      >
        {image ? (
          <Box
            component="img"
            src={image}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit:
                "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent:
                "center",
              alignItems:
                "center",
              color:
                "text.secondary",
            }}
          >
            No Image
          </Box>
        )}

        <Chip
          label={
            isOutOfStock
              ? "Out of Stock"
              : "Available"
          }
          color={
            isOutOfStock
              ? "error"
              : "success"
          }
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        />
      </Box>

      <CardContent
        sx={{
          p: 2.5,
          flex: 1,
          display: "flex",
          flexDirection:
            "column",
        }}
      >
        <Stack
          spacing={1.5}
          sx={{
            height: "100%",
          }}
        >
          {/* CATEGORY */}

          <Typography
            variant="caption"
            color="success.main"
            fontWeight={700}
            sx={{
              textTransform:
                "uppercase",
            }}
          >
            {product.category}
          </Typography>

          {/* NAME */}

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              lineHeight: 1.4,
            }}
          >
            {product.name}
          </Typography>

          {/* BRAND */}

          {product.brand && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Brand:{" "}
              {product.brand}
            </Typography>
          )}

          {/* DESCRIPTION */}

          {product.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display:
                  "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient:
                  "vertical",
                overflow: "hidden",
              }}
            >
              {
                product.description
              }
            </Typography>
          )}

          {/* PRICE */}

          <Box
            sx={{
              pt: 1,
              mt: "auto",
            }}
          >
            <Typography
              variant="h5"
              color="success.main"
              fontWeight={800}
            >
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Stock:{" "}
              {product.stock}
            </Typography>
          </Box>

          {/* ACTIONS */}

          <Stack
            direction="row"
            spacing={1}
            sx={{
              pt: 1,
            }}
          >
            <Button
              fullWidth
              component={Link}
              href={`/marketplace/${product._id}`}
              variant="outlined"
              color="success"
              startIcon={
                <VisibilityOutlinedIcon />
              }
            >
              Details
            </Button>

            <Button
              fullWidth
              component={Link}
              href={`/marketplace/${product._id}`}
              variant="contained"
              color="success"
              disabled={
                isOutOfStock
              }
              startIcon={
                <ShoppingCartOutlinedIcon />
              }
            >
              Buy
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}