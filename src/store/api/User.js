import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Userapi = createApi({
  reducerPath: "Userapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/v1/user",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (userdata) => ({
        url: "/memberlogin",
        method: "POST",
        body: userdata,
      }),
    }),
    userRegister: builder.mutation({
      query: (userdata) => ({
        url: "/signup",
        method: "POST",
        body: userdata,
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserLogoutMutation,
} = Userapi;
