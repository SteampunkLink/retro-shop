import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (pageNumber) => ({
        url: PRODUCTS_URL,
        params: pageNumber,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getOneProduct: builder.query({
      query: (prodId) => ({
        url: `${PRODUCTS_URL}/${prodId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ prodId, updatedFields }) => ({
        url: `${PRODUCTS_URL}/${prodId}`,
        method: "PATCH",
        body: updatedFields,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (prodId) => ({
        url: `${PRODUCTS_URL}/${prodId}`,
        method: "DELETE",
      }),
    }),
    createReview: builder.mutation({
      query: ({ prodId, data }) => ({
        url: `${PRODUCTS_URL}/${prodId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productsApiSlice;
