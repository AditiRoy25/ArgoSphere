// src/types/report.types.ts

/* ===========================
   DASHBOARD
=========================== */

export interface DashboardSummary {
  totalFarmers: number;
  totalFarms: number;
  totalSeeds: number;
  totalFertilizers: number;
  totalMarketplaceProducts: number;
  totalMarketplaceOrders: number;
  totalNGOs: number;
  totalAllowances: number;
}

export interface DashboardSummaryResponse {
  success: boolean;
  summary: DashboardSummary;
}

/* ===========================
   FARMER GROWTH
=========================== */

export interface FarmerGrowth {
  month: string;
  farmers: number;
}

export interface FarmerGrowthResponse {
  success: boolean;
  growth: FarmerGrowth[];
}

/* ===========================
   FARM REPORT
=========================== */

export interface FarmReport {
  district: string;
  farms: number;
  totalArea: number;
}

export interface FarmReportResponse {
  success: boolean;
  report: FarmReport[];
}

/* ===========================
   CROP REPORT
=========================== */

export interface CropReport {
  crop: string;
  farms: number;
}

export interface CropReportResponse {
  success: boolean;
  report: CropReport[];
}

/* ===========================
   SEED SALES
=========================== */

export interface SeedSales {
  seed: string;
  quantity: number;
  revenue: number;
}

export interface SeedSalesResponse {
  success: boolean;
  report: SeedSales[];
}

/* ===========================
   FERTILIZER REPORT
=========================== */

export interface FertilizerReport {
  fertilizer: string;
  quantity: number;
}

export interface FertilizerReportResponse {
  success: boolean;
  report: FertilizerReport[];
}

/* ===========================
   MARKETPLACE
=========================== */

export interface MarketplaceReport {
  totalOrders: number;
  totalRevenue: number;
}

export interface MarketplaceReportResponse {
  success: boolean;
  report: MarketplaceReport;
}

/* ===========================
   NGO
=========================== */

export interface NGOReport {
  ngo: string;
  workshops: number;
  farmersReached: number;
}

export interface NGOReportResponse {
  success: boolean;
  report: NGOReport[];
}

/* ===========================
   ALLOWANCE
=========================== */

export interface AllowanceReport {
  scheme: string;
  applications: number;
  approved: number;
  rejected: number;
}

export interface AllowanceReportResponse {
  success: boolean;
  report: AllowanceReport[];
}

/* ===========================
   WEATHER
=========================== */

export interface WeatherReport {
  district: string;
  alerts: number;
}

export interface WeatherReportResponse {
  success: boolean;
  report: WeatherReport[];
}