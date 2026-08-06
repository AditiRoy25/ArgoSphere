import { baseApi } from "./baseApi";

import type {
  DashboardSummaryResponse,
  RecentActivityResponse,
  CropYieldResponse,
} from "../../types/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard Summary
    getDashboardSummary: builder.query<
      DashboardSummaryResponse,
      void
    >({
      query: () => ({
        url: "/dashboard/summary",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // Recent Activity
    getRecentActivity: builder.query<
      RecentActivityResponse,
      void
    >({
      query: () => ({
        url: "/activity/recent",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // Crop Yield Report
    getCropYield: builder.query<
      CropYieldResponse,
      void
    >({
      query: () => ({
        url: "/reports/crop-yield",
        method: "GET",
      }),
      providesTags: ["Report"],
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetRecentActivityQuery,
  useGetCropYieldQuery,
} = dashboardApi;