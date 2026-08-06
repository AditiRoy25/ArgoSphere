import { baseApi } from "./baseApi";

import type {
  GovernmentSchemesResponse,
  GovernmentSchemeResponse,
  CreateSchemePayload,
  UpdateSchemePayload,
  ApplySchemePayload,
  SchemeApplicationResponse,
  MySchemesResponse,
  SchemeQuery,
} from "../../types/scheme";

export const schemeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ==========================================
    // PUBLIC
    // ==========================================

    getSchemes: builder.query<
      GovernmentSchemesResponse,
      SchemeQuery | void
    >({
      query: (params) => ({
        url: "/schemes",
        method: "GET",
        params,
      }),
      providesTags: ["Scheme"],
    }),

    getSchemeById: builder.query<
      GovernmentSchemeResponse,
      string
    >({
      query: (id) => ({
        url: `/schemes/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        {
          type: "Scheme",
          id,
        },
      ],
    }),

    // ==========================================
    // FARMER
    // ==========================================

    applyScheme: builder.mutation<
      SchemeApplicationResponse,
      ApplySchemePayload
    >({
      query: (body) => ({
        url: "/schemes/apply",
        method: "POST",
        body,
      }),

      invalidatesTags: [
        "Scheme",
        "MyScheme",
      ],
    }),

    mySchemes: builder.query<
      MySchemesResponse,
      void
    >({
      query: () => ({
        url: "/schemes/my",
        method: "GET",
      }),

      providesTags: [
        "MyScheme",
      ],
    }),

    // ==========================================
    // ADMIN
    // ==========================================

    createScheme: builder.mutation<
      GovernmentSchemeResponse,
      CreateSchemePayload
    >({
      query: (body) => ({
        url: "/schemes",
        method: "POST",
        body,
      }),

      invalidatesTags: [
        "Scheme",
      ],
    }),

    updateScheme: builder.mutation<
      GovernmentSchemeResponse,
      {
        id: string;
        body: UpdateSchemePayload;
      }
    >({
      query: ({
        id,
        body,
      }) => ({
        url: `/schemes/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: (
        _result,
        _error,
        { id }
      ) => [
        "Scheme",
        {
          type: "Scheme",
          id,
        },
      ],
    }),

    deleteScheme: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      string
    >({
      query: (id) => ({
        url: `/schemes/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: [
        "Scheme",
      ],
    }),
  }),
});

export const {

  // PUBLIC

  useGetSchemesQuery,
  useGetSchemeByIdQuery,

  // FARMER

  useApplySchemeMutation,
  useMySchemesQuery,

  // ADMIN

  useCreateSchemeMutation,
  useUpdateSchemeMutation,
  useDeleteSchemeMutation,

} = schemeApi;