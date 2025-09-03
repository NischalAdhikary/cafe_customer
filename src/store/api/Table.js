import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Tableapi = createApi({
  reducerPath: "tableapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/v1/table",
    credentials: "include",
    tagTypes: ["Table"],
  }),
  endpoints: (builder) => ({
    getTableStatus: builder.query({
      query: (tableid) => `/scan/${tableid}`,
    }),
    bookTable: builder.mutation({
      query: (tableid) => ({
        url: `/book/${tableid}`,
        method: "POST",
      }),
      invalidatesTags: ["Table"],
    }),
    getbookedtable: builder.query({
      query: () => "/",
      providesTags: ["Table"],
    }),
    unBookTable: builder.mutation({
      query: () => ({
        url: "/unbook",
        method: "PATCH",
      }),
      invalidatesTags: ["Table"],
    }),
    getAllTables: builder.query({
      query: () => `/alltables`,
      providesTags: ["Table"],
    }),
    getBookedTableDeatils: builder.query({
      query: (tableid) => `/bookedtabledetails/${tableid}`,
    }),
    unBookTableAdmin: builder.mutation({
      query: ({ tableid, userid }) => ({
        url: "/unbookadmin",
        method: "PATCH",
        body: { tableid, userid },
      }),
    }),
    deleteTableAdmin: builder.mutation({
      query: (tableid) => ({
        url: `/delete/${tableid}`,
        method: "DELETE",
      }),
    }),
    editTableAdmin: builder.mutation({
      query: (table) => ({
        url: `/edit/${table.tableid}`,
        method: "PATCH",
        body: table,
      }),
    }),
    createTableAdmin: builder.mutation({
      query: (table) => ({
        url: "create",
        method: "POST",
        body: table,
      }),
    }),
  }),
});

export const {
  useGetTableStatusQuery,
  useBookTableMutation,
  useGetbookedtableQuery,
  useUnBookTableMutation,
  useGetAllTablesQuery,
  useGetBookedTableDeatilsQuery,
  useUnBookTableAdminMutation,
  useDeleteTableAdminMutation,
  useEditTableAdminMutation,
  useCreateTableAdminMutation,
} = Tableapi;
