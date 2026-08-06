import { baseApi } from "./baseApi";

import type {
  HelpResponse,
} from "@/src/types/help";

export const helpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHelp: builder.query<
      HelpResponse,
      void
    >({
      query: () => ({
        url: "/dashboard/help",
        method: "GET",
      }),

      providesTags: ["Help"],
    }),
  }),
});

export const {
  useGetHelpQuery,
} = helpApi;