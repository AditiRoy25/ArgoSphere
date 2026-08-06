"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";

import {
  useGetProductsQuery,
  useGetAllOrdersQuery,
} from "../../../redux/api/maketplaceApi";

export default function MarketplaceDashboardPage() {
  const { data: productData } = useGetProductsQuery();

  const { data: orderData } =
    useGetAllOrdersQuery();

  const products =
    productData?.products ?? [];

  const orders =
    orderData?.orders ?? [];

  const totalProducts =
    products.length;

  const totalStock =
    products.reduce(
      (sum, item) =>
        sum + item.stock,
      0
    );

  const totalOrders =
    orders.length;

  const totalRevenue =
    orders.reduce(
      (sum, item) =>
        sum + item.totalAmount,
      0
    );

  const cards = [
    {
      title: "Products",
      value: totalProducts,
      icon: <CategoryIcon fontSize="large" />,
    },
    {
      title: "Stock",
      value: totalStock,
      icon: <Inventory2Icon fontSize="large" />,
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: <ShoppingCartIcon fontSize="large" />,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue}`,
      icon: <AddCircleIcon fontSize="large" />,
    },
  ];

  return (
    <Box>

      <Typography
        variant="h4"
       sx={{ fontWeight:700,
        mb:4}}
      >
        Marketplace Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
      >
        {cards.map((card) => (
          <Grid
            key={card.title}
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <Card>
              <CardContent>

                <Stack
               sx={{   direction:"row",
                  justifyContent:"space-between",
                  alignItems:"center"}}
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{fontWeight:700}}
                    >
                      {card.value}
                    </Typography>
                  </Box>

                  {card.icon}

                </Stack>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h5"
        sx={{mt:5,
        mb:2}}
      >
        Quick Actions
      </Typography>

      <Stack
      sx={{  direction:"row",
        spacing:2,
        flexWrap:"wrap"}}
      >
        <Link
          href="/admin/marketplace/create"
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            variant="contained"
          >
            Create Product
          </Button>
        </Link>

        <Link
          href="/admin/marketplace/products"
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            variant="outlined"
          >
            Manage Products
          </Button>
        </Link>

        <Link
          href="/admin/marketplace/orders"
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            variant="outlined"
          >
            View Orders
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}