import { baseApi } from "./baseApi";

import type {
  CropCalendarResponse,
  SingleCropResponse,
  CreateCropPayload,
  UpdateCropPayload,
  CropSuccessResponse,
  DeleteCropResponse,
} from "@/src/types/cropCalendar";

export const cropCalendarApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({

      // ==========================================
      // MY CROPS
      // ==========================================

      getMyCrops: builder.query<
        CropCalendarResponse,
        void
      >({
        query: () => ({
          url: "/crop-calendar/my",
          method: "GET",
        }),

        providesTags: ["CropCalendar"],
      }),

      // ==========================================
      // UPCOMING ACTIVITIES
      // ==========================================

      getUpcomingCrops: builder.query<
        CropCalendarResponse,
        void
      >({
        query: () => ({
          url: "/crop-calendar/upcoming",
          method: "GET",
        }),

        providesTags: ["CropCalendar"],
      }),

      // ==========================================
      // SINGLE CROP
      // ==========================================

      getCrop: builder.query<
        SingleCropResponse,
        string
      >({
        query: (id) => ({
          url: `/crop-calendar/${id}`,
          method: "GET",
        }),

        providesTags: (_result, _error, id) => [
          {
            type: "CropCalendar",
            id,
          },
        ],
      }),

      // ==========================================
      // CREATE CROP
      // ==========================================

      createCrop: builder.mutation<
        CropSuccessResponse,
        CreateCropPayload
      >({
        query: (body) => ({
          url: "/crop-calendar",
          method: "POST",
          body,
        }),

        invalidatesTags: ["CropCalendar"],
      }),

      // ==========================================
      // UPDATE CROP
      // ==========================================

      updateCrop: builder.mutation<
        CropSuccessResponse,
        {
          id: string;
          body: UpdateCropPayload;
        }
      >({
        query: ({
          id,
          body,
        }) => ({
          url: `/crop-calendar/${id}`,
          method: "PUT",
          body,
        }),

        invalidatesTags: (_result, _error, { id }) => [
          "CropCalendar",
          {
            type: "CropCalendar",
            id,
          },
        ],
      }),

      // ==========================================
      // DELETE CROP
      // ==========================================

      deleteCrop: builder.mutation<
        DeleteCropResponse,
        string
      >({
        query: (id) => ({
          url: `/crop-calendar/${id}`,
          method: "DELETE",
        }),

        invalidatesTags: ["CropCalendar"],
      }),

    }),
  });

export const {

  useGetMyCropsQuery,

  useGetUpcomingCropsQuery,

  useGetCropQuery,

  useCreateCropMutation,

  useUpdateCropMutation,

  useDeleteCropMutation,

} = cropCalendarApi;