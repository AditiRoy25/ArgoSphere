// src/redux/api/reportApi.ts

import { baseApi } from "./baseApi";

import {
  CategoryReportResponse,
  TopSellingResponse,
  RevenueReportResponse,
} from "../../types/mpRport.types";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getCategoryReport: builder.query<
      CategoryReportResponse,
      void
    >({
      query: () => ({
        url: "/marketplace/products/category-report",
        method: "GET",
      }),

      providesTags: ["Marketplace"],
    }),

    getTopSellingProducts: builder.query<
      TopSellingResponse,
      void
    >({
      query: () => ({
        url: "/marketplace/products/top-selling",
        method: "GET",
      }),

      providesTags: ["Marketplace"],
    }),

    getRevenueReport: builder.query<
      RevenueReportResponse,
      void
    >({
      query: () => ({
        url: "/marketplace/products/revenue-report",
        method: "GET",
      }),

      providesTags: ["Marketplace"],
    }),

  }),
});

export const {
  useGetCategoryReportQuery,
  useGetTopSellingProductsQuery,
  useGetRevenueReportQuery,
} = reportApi;