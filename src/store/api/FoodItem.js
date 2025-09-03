import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Fooditemapi = createApi({
  reducerPath: "FooditemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/v1/fooditem",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getFoodItems: builder.query({
      query: () => `/`,
    }),
    deleteFood: builder.mutation({
      query: ({ foodid, selectedFood }) => ({
        url: `/delete/${foodid}`,
        method: "PATCH",
        body: { selectedFood },
      }),
    }),
    editFood: builder.mutation({
      query: (formData) => ({
        url: `/edit`,
        method: "PATCH",
        body: formData,
      }),
    }),
    createFood: builder.mutation({
      query: (fooddata) => ({
        url: `/create`,
        method: "POST",
        body: fooddata,
      }),
    }),
  }),
});
export const {
  useGetFoodItemsQuery,
  useDeleteFoodMutation,
  useEditFoodMutation,
  useCreateFoodMutation,
} = Fooditemapi;
