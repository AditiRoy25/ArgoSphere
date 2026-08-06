import { baseApi } from "./baseApi";

import type {
  NotificationsResponse,
} from "@/src/types/notification.types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    notifications: builder.query<
      NotificationsResponse,
      void
    >({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),

      providesTags: ["Notification"],
    }),

  }),
});

export const {
  useNotificationsQuery,
} = notificationApi;