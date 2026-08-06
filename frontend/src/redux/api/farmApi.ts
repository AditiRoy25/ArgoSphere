import {
  baseApi,
} from "./baseApi";

import type {
  Farm,
  MyFarmsResponse,
  CreateFarmPayload,
} from "@/src/types/farm";

interface FarmResponse {
  success: boolean;
  message?: string;
  farm: Farm;
}

export const farmApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({

      // =====================================
      // FARMER - MY FARMS
      // =====================================

      getMyFarms:
        builder.query<
          MyFarmsResponse,
          void
        >({
          query: () => ({
            url: "/farms/my-farms",
            method: "GET",
          }),

          providesTags: [
            "Farm",
          ],
        }),

      // =====================================
      // CREATE FARM
      // =====================================

      createFarm:
        builder.mutation<
          FarmResponse,
          CreateFarmPayload
        >({
          query: (body) => ({
            url: "/farms",
            method: "POST",
            body,
          }),

          invalidatesTags: [
            "Farm",
          ],
        }),

      // =====================================
      // GET SINGLE FARM
      // =====================================

      getFarm:
        builder.query<
          FarmResponse,
          string
        >({
          query: (id) => ({
            url: `/farms/${id}`,
            method: "GET",
          }),

          providesTags:
            (
              _result,
              _error,
              id
            ) => [
              {
                type: "Farm",
                id,
              },
            ],
        }),

      // =====================================
      // UPDATE FARM
      // =====================================

      updateFarm:
        builder.mutation<
          FarmResponse,
          {
            id: string;
            body:
              Partial<CreateFarmPayload>;
          }
        >({
          query: ({
            id,
            body,
          }) => ({
            url: `/farms/${id}`,
            method: "PUT",
            body,
          }),

          invalidatesTags: [
            "Farm",
          ],
        }),

      // =====================================
      // DELETE FARM
      // =====================================

      deleteFarm:
        builder.mutation<
          {
            success: boolean;
            message: string;
          },
          string
        >({
          query: (id) => ({
            url: `/farms/${id}`,
            method: "DELETE",
          }),

          invalidatesTags: [
            "Farm",
          ],
        }),

    }),
  });

export const {
  useGetMyFarmsQuery,
  useCreateFarmMutation,
  useGetFarmQuery,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = farmApi;