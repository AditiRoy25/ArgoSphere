

"use client";

import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import {
  useGetCategoryReportQuery,
  useGetTopSellingProductsQuery,
  useGetRevenueReportQuery,
} from "../../../../redux/api/marketplaceReportApi";

export default function MarketplaceReportsPage() {

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetCategoryReportQuery();

  const {
    data: topSellingData,
    isLoading: topLoading,
    isError: topError,
  } = useGetTopSellingProductsQuery();

  const {
    data: revenueData,
    isLoading: revenueLoading,
    isError: revenueError,
  } = useGetRevenueReportQuery();

  if (
    categoryLoading ||
    topLoading ||
    revenueLoading
  ) {
    return (
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (
    categoryError ||
    topError ||
    revenueError
  ) {
    return (
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Alert severity="error">
          Failed to load reports.
        </Alert>
      </Container>
    );
  }

  const categoryColumns: GridColDef[] = [
    {
      field: "_id",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "totalProducts",
      headerName: "Products",
      flex: 1,
    },
  ];

  const topColumns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Product",
      flex: 1,
    },
    {
      field: "totalSold",
      headerName: "Sold",
      width: 120,
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={4}>

        <Typography
          variant="h4"
          sx={{fontWeight:700}}
        >
          Marketplace Reports
        </Typography>

        <Grid
          container
          spacing={3}
        >

          <Grid
            size={{
              xs:12,
              md:6,
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                 sx={{ mb:2}}
                >
                  Revenue
                </Typography>

                <Typography variant="h3">
                  ₹
                  {revenueData?.totalRevenue ?? 0}
                </Typography>

                <Typography color="text.secondary">
                  Orders :
                  {revenueData?.totalOrders ?? 0}
                </Typography>

              </CardContent>
            </Card>
          </Grid>

          <Grid
            size={{
              xs:12,
              md:6,
            }}
          >
            <Card>
              <CardContent>

                <Typography
                  variant="h6"
                 sx={{ mb:2}}
                >
                  Category Report
                </Typography>

                <DataGrid
                  autoHeight
                  rows={
                    categoryData?.report ??
                    []
                  }
                  columns={categoryColumns}
                  getRowId={(row)=>row._id}
                  pageSizeOptions={[5]}
                />

              </CardContent>
            </Card>
          </Grid>

          <Grid
            size={{
              xs:12,
            }}
          >
            <Card>
              <CardContent>

                <Typography
                  variant="h6"
                  sx={{ mb:2}}
                >
                  Top Selling Products
                </Typography>

                <DataGrid
                  autoHeight
                  rows={
                    topSellingData?.products ??
                    []
                  }
                  columns={topColumns}
                  getRowId={(row)=>row._id}
                  pageSizeOptions={[5,10]}
                />

              </CardContent>
            </Card>
          </Grid>

        </Grid>

      </Stack>
    </Container>
  );
}