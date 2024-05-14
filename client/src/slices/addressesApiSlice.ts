import { apiSlice } from "./apiSlice";
import { ADDRESSES_URL } from "../constants";

export const addressesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (address) => ({
        url: ADDRESSES_URL,
        method: "POST",
        body: { ...address },
      }),
    }),
    getAllAddresses: builder.query({
      query: () => ({
        url: ADDRESSES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOneAddress: builder.query({
      query: (addressId) => ({
        url: `${ADDRESSES_URL}/${addressId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateOneAddress: builder.mutation({
      query: ({ addressId, fields }) => ({
        url: `${ADDRESSES_URL}/${addressId}`,
        method: "PATCH",
        body: fields,
      }),
    }),
    deleteOneAddress: builder.mutation({
      query: (addressId) => ({
        url: `${ADDRESSES_URL}/${addressId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAllAddressesQuery,
  useGetOneAddressQuery,
  useUpdateOneAddressMutation,
  useDeleteOneAddressMutation,
} = addressesApiSlice;
