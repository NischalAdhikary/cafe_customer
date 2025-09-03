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
    getAllCustomers: builder.query({
      query: () => "/customers",
    }),
    deleteUser: builder.mutation({
      query: (userid) => ({
        url: `/delete/${userid}`,
        method: "DELETE",
      }),
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: `/edit/${user.userid}`,
        method: "PATCH",
        body: user,
      }),
    }),
    createCustomer: builder.mutation({
      query: (customer) => ({
        url: "/createcustomer",
        method: "POST",
        body: customer,
      }),
    }),
    getAvailableCustomers: builder.query({
      query: () => `/availablecustomers`,
    }),
    verifyUser: builder.query({
      query: () => `/verifyuser`,
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useUserLogoutMutation,
  useGetAllCustomersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  useCreateCustomerMutation,
  useGetAvailableCustomersQuery,
  useVerifyUserQuery,
} = Userapi;
