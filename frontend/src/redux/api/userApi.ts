import { baseApi } from "./baseApi";

import type { ApiResponse } from "../../types/api.types";

import type { IUser } from "../../types/user.types";

export interface UpdateProfilePayload {
  name: string;
  phone: string;
  gender: "male" | "female" | "other";
  address: string;
  district: string;
  state: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==========================
    // My Profile
    // ==========================

    getMyProfile: builder.query<
      ApiResponse & {
        user: IUser;
      },
      void
    >({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),

      providesTags: ["Profile"],
    }),

    // ==========================
    // Update Profile
    // ==========================

    updateProfile: builder.mutation<
      ApiResponse,
      UpdateProfilePayload
    >({
      query: (body) => ({
        url: "/user/profile",

        method: "PUT",

        body,
      }),

      invalidatesTags: ["Profile"],
    }),

    // ==========================
    // Upload Profile Image
    // ==========================

    uploadProfileImage: builder.mutation<
      ApiResponse,
      FormData
    >({
      query: (body) => ({
        url: "/user/profile-image",

        method: "PUT",

        body,
      }),

      invalidatesTags: ["Profile"],
    }),

    // ==========================
    // Remove Profile Image
    // ==========================

    removeProfileImage: builder.mutation<
      ApiResponse,
      void
    >({
      query: () => ({
        url: "/user/profile-image",

        method: "DELETE",
      }),

      invalidatesTags: ["Profile"],
    }),

    // ==========================
    // Change Password
    // ==========================

    changePassword: builder.mutation<
      ApiResponse,
      ChangePasswordPayload
    >({
      query: (body) => ({
        url: "/user/change-password",

        method: "PUT",

        body,
      }),

      invalidatesTags: ["Profile"],
    }),

    // ==========================
    // Delete Account
    // ==========================

    deleteAccount: builder.mutation<
      ApiResponse,
      void
    >({
      query: () => ({
        url: "/user/account",

        method: "DELETE",
      }),

      invalidatesTags: ["Profile"],
    }),
  }),

  overrideExisting: false,
});



export const {
  useGetMyProfileQuery,

  useLazyGetMyProfileQuery,

  useUpdateProfileMutation,

  useUploadProfileImageMutation,

  useRemoveProfileImageMutation,

  useChangePasswordMutation,

  useDeleteAccountMutation,
} = userApi;
