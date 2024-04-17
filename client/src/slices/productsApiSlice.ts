// import { PayloadAction } from "@reduxjs/toolkit";
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOneProduct: builder.query({
      query: (prodId) => ({
        url: `${PRODUCTS_URL}/${prodId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetOneProductQuery } = productsApiSlice;
