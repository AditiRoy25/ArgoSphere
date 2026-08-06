import { baseApi } from "./baseApi";

import type {
  ApiResponse,
  PaginatedResponse,
  SingleResponse,
} from "../../types/api.types";

import type {
  IUser,
  UserQuery,
} from "../../types/user.types";

// ======================================
// UPDATE ROLE PAYLOAD
// ======================================

export interface UpdateUserRolePayload {
  id: string;

  role:
    | "farmer"
    | "ngo"
    | "officer"
    | "ministry"
    | "admin";
}

// ======================================
// ADMIN API
// ======================================

export const adminApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // =================================
      // DASHBOARD
      // GET /admin/dashboard
      // =================================

      getDashboardStats:
        builder.query<any, void>({
          query: () => ({
            url: "/admin/dashboard",
            method: "GET",
          }),

          providesTags: [
            "Dashboard",
          ],
        }),

      // =================================
      // GET USERS
      // GET /admin/users
      // =================================

      getUsers: builder.query<
        PaginatedResponse<IUser>,
        UserQuery | void
      >({
        query: (params) => ({
          url: "/admin/users",

          method: "GET",

          params: params
            ? {
                page:
                  params.page ?? 1,

                limit:
                  params.limit ?? 10,

                search:
                  params.search ||
                  undefined,

                role:
                  params.role ||
                  undefined,

                isBlocked:
                  params.isBlocked,
              }
            : {
                page: 1,
                limit: 10,
              },
        }),

        providesTags: (result) =>
          result?.data
            ? [
                ...result.data.map(
                  (user) => ({
                    type:
                      "Users" as const,

                    id: user._id,
                  })
                ),

                {
                  type:
                    "Users" as const,

                  id: "LIST",
                },
              ]
            : [
                {
                  type:
                    "Users" as const,

                  id: "LIST",
                },
              ],
      }),

      // =================================
      // GET USER BY ID
      // GET /admin/users/:id
      // =================================

      getUserById:
        builder.query<
          SingleResponse<IUser>,
          string
        >({
          query: (id) => ({
            url:
              `/admin/users/${id}`,

            method: "GET",
          }),

          providesTags: (
            _result,
            _error,
            id
          ) => [
            {
              type: "Users",
              id,
            },
          ],
        }),

      // =================================
      // CREATE USER
      // POST /admin/users
      //
      // FormData because image upload
      // =================================

      createUser:
        builder.mutation<
          ApiResponse,
          FormData
        >({
          query: (body) => ({
            url: "/admin/users",

            method: "POST",

            body,
          }),

          invalidatesTags: [
            {
              type: "Users",
              id: "LIST",
            },

            "Dashboard",
          ],
        }),

      // =================================
      // UPDATE USER
      // PUT /admin/users/:id
      //
      // FormData because image can change
      // =================================

      updateUser:
        builder.mutation<
          ApiResponse,
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
              `/admin/users/${id}`,

            method: "PUT",

            body,
          }),

          invalidatesTags: (
            _result,
            _error,
            { id }
          ) => [
            {
              type: "Users",
              id,
            },

            {
              type: "Users",
              id: "LIST",
            },

            "Dashboard",
          ],
        }),

      // =================================
      // DELETE USER
      // DELETE /admin/users/:id
      // =================================

      deleteUser:
        builder.mutation<
          ApiResponse,
          string
        >({
          query: (id) => ({
            url:
              `/admin/users/${id}`,

            method: "DELETE",
          }),

          invalidatesTags: [
            {
              type: "Users",
              id: "LIST",
            },

            "Dashboard",
          ],
        }),

      // =================================
      // UPDATE USER ROLE
      // PUT /admin/users/:id/role
      // =================================

      updateUserRole:
        builder.mutation<
          SingleResponse<IUser>,
          UpdateUserRolePayload
        >({
          query: ({
            id,
            role,
          }) => ({
            url:
              `/admin/users/${id}/role`,

            method: "PUT",

            body: {
              role,
            },
          }),

          invalidatesTags: (
            _result,
            _error,
            { id }
          ) => [
            {
              type: "Users",
              id,
            },

            {
              type: "Users",
              id: "LIST",
            },
            {
      type: "Farmers",
      id,
    },
    {
      type: "Farmers",
      id: "LIST",
    },

            "Dashboard",
          ],
        }),

      // =================================
      // BLOCK USER
      // PUT /admin/users/:id/block
      // =================================

     blockUser: builder.mutation<
  SingleResponse<IUser>,
  string
>({
  query: (id) => ({
    url: `/admin/users/${id}/block`,
    method: "PUT",
  }),

  invalidatesTags: (
    _result,
    _error,
    id
  ) => [
    {
      type: "Users",
      id,
    },
    {
      type: "Users",
      id: "LIST",
    },
    {
      type: "Farmers",
      id,
    },
    {
      type: "Farmers",
      id: "LIST",
    },
    "Dashboard",
  ],
}),

      // =================================
      // UNBLOCK USER
      // PUT /admin/users/:id/unblock
      // =================================

      unblockUser: builder.mutation<
  SingleResponse<IUser>,
  string
>({
  query: (id) => ({
    url: `/admin/users/${id}/unblock`,
    method: "PUT",
      }),

      blockNgo: builder.mutation<ApiResponse, string>({
        query: (id) => ({ url: `/admin/ngos/${id}/block`, method: "PUT" }),
        invalidatesTags: ["NGOs"],
      }),

      unblockNgo: builder.mutation<ApiResponse, string>({
        query: (id) => ({ url: `/admin/ngos/${id}/unblock`, method: "PUT" }),
        invalidatesTags: ["NGOs"],
      }),

  invalidatesTags: (
    _result,
    _error,
    id
  ) => [
    {
      type: "Users",
      id,
    },
    {
      type: "Users",
      id: "LIST",
    },
    {
      type: "Farmers",
      id,
    },
    {
      type: "Farmers",
      id: "LIST",
    },
    "Dashboard",
  ],
}),

      // =================================
      // VERIFY NGO
      // PUT /admin/ngo/:id/verify
      // =================================

      verifyNgo:
        builder.mutation<
          ApiResponse,
          string
        >({
          query: (id) => ({
            url:
              `/admin/ngo/${id}/verify`,

            method: "PUT",
          }),

          invalidatesTags: [
            "NGOs",
            "Dashboard",
          ],
        }),

      // =================================
      // ANALYTICS
      // GET /admin/analytics
      // =================================

      getAnalytics:
        builder.query<any, void>({
          query: () => ({
            url:
              "/admin/analytics",

            method: "GET",
          }),

          providesTags: [
            "Dashboard",
          ],
        }),
    }),

    overrideExisting: false,
  });

// ======================================
// HOOKS
// ======================================

export const {
  useGetDashboardStatsQuery,

  useGetUsersQuery,
  useGetUserByIdQuery,

  useCreateUserMutation,

  // ADDED
  useUpdateUserMutation,
  useDeleteUserMutation,

  useUpdateUserRoleMutation,

  useBlockUserMutation,
  useUnblockUserMutation,
  useBlockNgoMutation,
  useUnblockNgoMutation,

  useVerifyNgoMutation,

  useGetAnalyticsQuery,
} = adminApi;
