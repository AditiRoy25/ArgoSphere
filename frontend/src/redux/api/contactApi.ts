import { baseApi } from "./baseApi";

import {
  Contact,
  ContactPayload,
  ContactResponse,
} from "../../types/contact.types";

export const contactApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Send Contact Message
      sendContact:
        builder.mutation<
          ContactResponse,
          ContactPayload
        >({
          query: (body) => ({
            url: "/contact",
            method: "POST",
            body,
          }),
        }),

      // Admin - Get All Messages
      getAllContacts:
        builder.query<
          Contact[],
          void
        >({
          query: () => ({
            url: "/contact",
            method: "GET",
          }),

          providesTags: ["Contact"],
        }),

      // Admin - Get Single Message
      getContactById:
        builder.query<
          Contact,
          string
        >({
          query: (id) => ({
            url: `/contact/${id}`,
            method: "GET",
          }),

          providesTags: ["Contact"],
        }),

      // Admin - Mark as Resolved
      resolveContact:
        builder.mutation<
          ContactResponse,
          string
        >({
          query: (id) => ({
            url: `/contact/${id}/resolve`,
            method: "PATCH",
          }),

          invalidatesTags: ["Contact"],
        }),

      // Admin - Delete Contact
      deleteContact:
        builder.mutation<
          ContactResponse,
          string
        >({
          query: (id) => ({
            url: `/contact/${id}`,
            method: "DELETE",
          }),

          invalidatesTags: ["Contact"],
        }),
    }),
  });

export const {
  useSendContactMutation,
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useResolveContactMutation,
  useDeleteContactMutation,
} = contactApi;