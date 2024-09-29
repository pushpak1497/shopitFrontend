import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["product", "adminProducts", "adminReviews"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          "price[gte]": params?.min,
          "price[lte]": params?.max,
          category: params?.category,
          "rating[gte]": params?.rating,
        },
      }),
    }),
    getProductdetails: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["product"],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["product"],
    }),
    canUserReview: builder.query({
      query: (id) => `/can_review/?productId=${id}`,
    }),
    getAdminProducts: builder.query({
      query: () => "/admin/products",
      providesTags: ["adminProducts"],
    }),
    createProduct: builder.mutation({
      query(body) {
        return {
          url: "/admin/products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query({ productId, body }) {
        return {
          url: `/admin/products/${productId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["product"],
    }),
    uploadProductImages: builder.mutation({
      query({ productId, body }) {
        return {
          url: `/admin/products/${productId}/upload_images`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete_image`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["adminProducts"],
    }),
    getAdminProductReviews: builder.query({
      query: (productId) => `/reviews/?id=${productId}`,
      providesTags: ["adminReviews"],
    }),
    deleteReview: builder.mutation({
      query({ productId, id }) {
        return {
          url: `/admin/reviews?productId=${productId}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["adminReviews"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductdetailsQuery,
  useSubmitReviewMutation,
  useCanUserReviewQuery,
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
  useLazyGetAdminProductReviewsQuery,
  useDeleteReviewMutation,
} = productApi;
