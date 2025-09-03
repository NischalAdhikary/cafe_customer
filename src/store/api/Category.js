import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Editcategory from "../../dashboard/pages/components/editcategory";

export const Categoryapi = createApi({
  reducerPath: "Categoryapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/v1/category",
    credentials: "include",
    tagTypes: ["Category"],
  }),

  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => `/`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (categorydata) => ({
        url: "/create",
        method: "POST",
        body: categorydata,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryid) => ({
        url: `/delete/${categoryid}`,
        method: "DELETE",
      }),
    }),
    editCategory: builder.mutation({
      query: ({ categorybody, categoryid }) => ({
        url: `/edit/${categoryid}`,
        method: "PATCH",
        body: { categorybody },
      }),
    }),
  }),
});
export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
} = Categoryapi;
