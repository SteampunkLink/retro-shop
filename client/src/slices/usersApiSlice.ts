import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { ILogin, IRegister } from "../interfaces/Auth";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILogin) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data: IRegister) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    // getProfile: builder.query({
    //   query: () => ({
    //     url: `${USERS_URL}/profile`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  // useGetProfileQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
} = usersApiSlice;
