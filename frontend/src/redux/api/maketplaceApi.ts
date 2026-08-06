import { baseApi } from "./baseApi";

import type {
  ProductResponse,
  ProductsResponse,
  CreateOrderPayload,
  OrderResponse,
  OrdersResponse,
} from "@/src/types/marketplace.types";

export const marketplaceApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // ==========================
      // PUBLIC
      // ==========================

      getProducts: builder.query<
        ProductsResponse,
        void
      >({
        query: () => ({
          url: "/marketplace/products",
          method: "GET",
        }),

        providesTags: ["Marketplace"],
      }),

      getProduct: builder.query<
        ProductResponse,
        string
      >({
        query: (id) => ({
          url: `/marketplace/products/${id}`,
          method: "GET",
        }),

        providesTags: (
          _result,
          _error,
          id
        ) => [
          {
            type: "Marketplace",
            id,
          },
        ],
      }),

      // ==========================
      // FARMER
      // ==========================

      createOrder: builder.mutation<
        OrderResponse,
        CreateOrderPayload
      >({
        query: (body) => ({
          url: "/marketplace/orders",
          method: "POST",
          body,
        }),

        invalidatesTags: ["Marketplace"],
      }),

      getMyOrders: builder.query<
        OrdersResponse,
        void
      >({
        query: () => ({
          url: "/marketplace/orders/my",
          method: "GET",
        }),

        providesTags: ["Marketplace"],
      }),

      // ==========================
      // ADMIN PRODUCTS
      // ==========================

      createProduct: builder.mutation<
        ProductResponse,
        FormData
      >({
        query: (body) => ({
          url: "/marketplace/products",
          method: "POST",
          body,
        }),

        invalidatesTags: ["Marketplace"],
      }),

      updateProduct: builder.mutation<
        ProductResponse,
        {
          id: string;
          body: FormData;
        }
      >({
        query: ({ id, body }) => ({
          url: `/marketplace/products/${id}`,
          method: "PUT",
          body,
        }),

        invalidatesTags: (
          _result,
          _error,
          { id }
        ) => [
          "Marketplace",
          {
            type: "Marketplace",
            id,
          },
        ],
      }),

      deleteProduct: builder.mutation<
        {
          success: boolean;
          message: string;
        },
        string
      >({
        query: (id) => ({
          url: `/marketplace/products/${id}`,
          method: "DELETE",
        }),

        invalidatesTags: ["Marketplace"],
      }),

      // ==========================
      // ADMIN ORDERS
      // ==========================

      getAllOrders: builder.query<
        OrdersResponse,
        void
      >({
        query: () => ({
          url: "/marketplace/orders",
          method: "GET",
        }),

        providesTags: ["Marketplace"],
      }),
    }),
  });

export const {
  useGetProductsQuery,
  useGetProductQuery,

  useCreateOrderMutation,
  useGetMyOrdersQuery,

  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  useGetAllOrdersQuery,
} = marketplaceApi;