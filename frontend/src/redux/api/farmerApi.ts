import { baseApi } from "./baseApi";

import type {
  IFarmer,
  FarmerQuery,
} from "../../types/farmer.types";

import type {
  PaginatedResponse,
  SingleResponse,
} from "../../types/api.types";

export const farmerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===========================
    // Get All Farmers
    // GET /admin/farmers
    // ===========================

    getFarmers: builder.query<
  PaginatedResponse<IFarmer>,
  FarmerQuery | void
>({
  query: (params) => ({
    url: "/user/farmers",
    method: "GET",
    params: params ?? undefined,
  }),

  providesTags: ["Farmers"],
}),
    // ===========================
    // Get Farmer By ID
    // GET /admin/farmers/:id
    // ===========================

    getFarmerById: builder.query<
      SingleResponse<IFarmer>,
      string
    >({
      query: (id) => ({
        url: `/user/farmers/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [
        {
          type: "Farmers",
          id,
        },
      ],
    }),







    

    // ===========================
    // Block Farmer
    // PUT /admin/farmers/:id/block
    // ===========================

    // blockFarmer: builder.mutation<
    //   SingleResponse<IFarmer>,
    //   string
    // >({
    //   query: (id) => ({
    //     url: `/admin/farmers/${id}/block`,
    //     method: "PUT",
    //   }),

    //   invalidatesTags: ["Farmers"],
    // }),

    // ===========================
    // Unblock Farmer
    // PUT /admin/farmers/:id/unblock
    // ===========================

    // unblockFarmer: builder.mutation<
    //   SingleResponse<IFarmer>,
    //   string
    // >({
    //   query: (id) => ({
    //     url: `/admin/farmers/${id}/unblock`,
    //     method: "PUT",
    //   }),

    //   invalidatesTags: ["Farmers"],
    // }),
  }),

  overrideExisting: false,
});

export const {
  useGetFarmersQuery,
  useGetFarmerByIdQuery,
  // useBlockFarmerMutation,
  // useUnblockFarmerMutation,
} = farmerApi;