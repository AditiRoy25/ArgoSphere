"use client";

import {
  Container,
  Stack,
  Typography,
} from "@mui/material";

import SummaryCards from "@/src/components/admin/reports/SummaryCards";
import FarmerGrowthChart from "@/src/components/admin/reports/FarmerGrowthChart";
import CropReportTable from "@/src/components/admin/reports/CropReportTable";
import SeedSalesTable from "@/src/components/admin/reports/SeedSalesTable";
import FertilizerReportTable from "@/src/components/admin/reports/FertilizerReportTable";
import MarketplaceReportCard from "@/src/components/admin/reports/MarketplaceReportCard";
import NGOReportTable from "@/src/components/admin/reports/NGOReportTable";
import AllowanceReportTable from "@/src/components/admin/reports/AllowanceReportTable";
import WeatherReportTable from "@/src/components/admin/reports/WeatherReportTable";

export default function ReportsPage() {
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
          Reports & Analytics
        </Typography>

        <SummaryCards />

        <FarmerGrowthChart />

        <CropReportTable />

        <SeedSalesTable />

        <FertilizerReportTable />

        <MarketplaceReportCard />

        <NGOReportTable />

        <AllowanceReportTable />

        <WeatherReportTable />
      </Stack>
    </Container>
  );
}