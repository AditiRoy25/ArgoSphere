import { baseApi } from "./baseApi";

import type {
  ProfileResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "@/src/types/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // My Profile
    myProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),

      transformResponse: (response: {
        success: boolean;
        message: string;
        data: ProfileResponse["profile"];
      }): ProfileResponse => ({
        success: response.success,
        message: response.message,
        profile: response.data,
      }),

      providesTags: ["Profile"],
    }),

    // Update Profile
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfilePayload
    >({
      query: (body) => ({
        url: "/user/update-profile",
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Profile"],
    }),

    // Change Password
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordPayload
    >({
      query: (body) => ({
        url: "/user/change-password",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
