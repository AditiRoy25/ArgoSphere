// src/redux/api/reportApi.ts

import { baseApi } from "./baseApi";

import {
  DashboardSummaryResponse,
  FarmerGrowthResponse,
  FarmReportResponse,
  CropReportResponse,
  SeedSalesResponse,
  FertilizerReportResponse,
  MarketplaceReportResponse,
  NGOReportResponse,
  AllowanceReportResponse,
  WeatherReportResponse,
} from "@/src/types/report.types";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getDashboardSummary: builder.query<
      DashboardSummaryResponse,
      void
    >({
      query: () => "/reports/dashboard",
      providesTags: ["Reports"],
    }),

    getFarmerGrowthReport: builder.query<
      FarmerGrowthResponse,
      void
    >({
      query: () => "/reports/farmer-growth",
      providesTags: ["Reports"],
    }),

    getFarmReport: builder.query<
      FarmReportResponse,
      void
    >({
      query: () => "/reports/farm-report",
      providesTags: ["Reports"],
    }),

    getCropReport: builder.query<
      CropReportResponse,
      void
    >({
      query: () => "/reports/crop-report",
      providesTags: ["Reports"],
    }),

    getSeedSalesReport: builder.query<
      SeedSalesResponse,
      void
    >({
      query: () => "/reports/seed-sales",
      providesTags: ["Reports"],
    }),

    getFertilizerReport: builder.query<
      FertilizerReportResponse,
      void
    >({
      query: () => "/reports/fertilizer-report",
      providesTags: ["Reports"],
    }),

    getMarketplaceReport: builder.query<
      MarketplaceReportResponse,
      void
    >({
      query: () => "/reports/marketplace-report",
      providesTags: ["Reports"],
    }),

    getNGOReport: builder.query<
      NGOReportResponse,
      void
    >({
      query: () => "/reports/ngo-report",
      providesTags: ["Reports"],
    }),

    getAllowanceReport: builder.query<
      AllowanceReportResponse,
      void
    >({
      query: () => "/reports/allowance-report",
      providesTags: ["Reports"],
    }),

    getWeatherReport: builder.query<
      WeatherReportResponse,
      void
    >({
      query: () => "/reports/weather-report",
      providesTags: ["Reports"],
    }),

  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetFarmerGrowthReportQuery,
  useGetFarmReportQuery,
  useGetCropReportQuery,
  useGetSeedSalesReportQuery,
  useGetFertilizerReportQuery,
  useGetMarketplaceReportQuery,
  useGetNGOReportQuery,
  useGetAllowanceReportQuery,
  useGetWeatherReportQuery,
} = reportApi;