import {
  baseApi,
} from "./baseApi";

import type {
  INgo,
  NgoQuery,
  NgoDashboardStatistics,
} from "../../types/ngo.types";

import type {
  PaginatedResponse,
  SingleResponse,
} from "../../types/api.types";


export const ngoApi =
  baseApi.injectEndpoints({

    endpoints: (builder) => ({

      // =================================
      // PUBLIC / COMMON
      // GET /ngo
      // =================================

      getNgos:
        builder.query<
          PaginatedResponse<INgo>,
          NgoQuery | void
        >({

          query: (params) => ({
            url: "/ngo",
            method: "GET",
            params:
              params ?? undefined,
          }),

          providesTags: [
            "NGOs",
          ],
        }),


      // =================================
      // GET NGO BY ID
      // =================================

      getNgoById:
        builder.query<
          SingleResponse<INgo>,
          string
        >({

          query: (id) => ({
            url:
              `/ngo/${id}`,

            method: "GET",
          }),

          providesTags: (
            _result,
            _error,
            id
          ) => [
            {
              type: "NGOs",
              id,
            },
          ],
        }),


      // =================================
      // LOGGED-IN NGO PROFILE
      // GET /ngo/me/profile
      // =================================

      getMyNgo:
        builder.query<
          SingleResponse<INgo>,
          void
        >({

          query: () => ({
            url:
              "/ngo/me/profile",

            method: "GET",
          }),

          providesTags: [
            {
              type: "NGOs",
              id: "MY_PROFILE",
            },
          ],
        }),


      // =================================
      // NGO DASHBOARD STATISTICS
      // GET /ngo/me/statistics
      // =================================

      getMyStatistics:
        builder.query<
          SingleResponse<NgoDashboardStatistics>,
          void
        >({

          query: () => ({
            url:
              "/ngo/me/statistics",

            method: "GET",
          }),

          providesTags: [
            "Analytics",
          ],
        }),


      // =================================
      // REGISTER NGO
      // =================================

      registerNgo:
        builder.mutation<
          SingleResponse<INgo>,
          FormData
        >({

          query: (body) => ({
            url: "/ngo",
            method: "POST",
            body,
          }),

          invalidatesTags: [
            "NGOs",
          ],
        }),


      // =================================
      // UPDATE NGO
      // =================================

      updateNgo:
        builder.mutation<
          SingleResponse<INgo>,
          {
            id: string;
            body: FormData;
          }
        >({

          query: ({
            id,
            body,
          }) => ({

            url:
              `/ngo/${id}`,

            method: "PUT",

            body,
          }),

          invalidatesTags: (
            _result,
            _error,
            { id }
          ) => [

            "NGOs",

            {
              type: "NGOs",
              id,
            },

            {
              type: "NGOs",
              id: "MY_PROFILE",
            },
          ],
        }),


      // =================================
      // NGO WORKSHOPS
      // =================================

      getNgoWorkshops:
        builder.query<
          any,
          string
        >({

          query: (id) => ({
            url:
              `/ngo/${id}/workshops`,

            method: "GET",
          }),

          providesTags: [
            "Workshops",
          ],
        }),


      // =================================
      // ADMIN / MINISTRY APPROVE
      // =================================

      approveNgo:
        builder.mutation<
          SingleResponse<INgo>,
          string
        >({

          query: (id) => ({
            url:
              `/ngo/approve/${id}`,

            method: "PUT",
          }),

          invalidatesTags: [
            "NGOs",
          ],
        }),


      // =================================
      // DELETE NGO
      // =================================

      deleteNgo:
        builder.mutation<
          SingleResponse<INgo>,
          string
        >({

          query: (id) => ({
            url:
              `/ngo/${id}`,

            method: "DELETE",
          }),

          invalidatesTags: [
            "NGOs",
          ],
        }),


      // =================================
      // ADMIN ANALYTICS
      // =================================

      getNgoAnalytics:
        builder.query<
          any,
          void
        >({

          query: () => ({
            url:
              "/ngo/analytics",

            method: "GET",
          }),

          providesTags: [
            "Analytics",
          ],
        }),


      // =================================
      // PERFORMANCE REPORT
      // =================================

      getNgoPerformanceReport:
        builder.query<
          any,
          void
        >({

          query: () => ({
            url:
              "/ngo/performance-report",

            method: "GET",
          }),

          providesTags: [
            "Analytics",
          ],
        }),

    }),

    overrideExisting: false,
  });


export const {

  // Public
  useGetNgosQuery,
  useGetNgoByIdQuery,

  // Logged-in NGO
  useGetMyNgoQuery,
  useGetMyStatisticsQuery,

  // NGO CRUD
  useRegisterNgoMutation,
  useUpdateNgoMutation,

  // Workshop
  useGetNgoWorkshopsQuery,

  // Admin
  useApproveNgoMutation,
  useDeleteNgoMutation,

  // Analytics
  useGetNgoAnalyticsQuery,
  useGetNgoPerformanceReportQuery,

} = ngoApi;