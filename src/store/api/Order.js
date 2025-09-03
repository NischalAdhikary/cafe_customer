import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Orderapi = createApi({
  reducerPath: "orderapi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/v1/order",
    credentials: "include",
    tagTypes: ["Order", "ActiveTakeAway", "ActiveDineIn"],
  }),
  endpoints: (builder) => ({
    getCreatedOrder: builder.query({
      query: () => `/`,
      providesTags: ["Order"],
    }),
    cancelOrderMaster: builder.mutation({
      query: () => ({
        url: "/",
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: ({ fooditems, ordertype }) => ({
        url: "/",
        method: "POST",
        body: { fooditems, ordertype },
      }),
      invalidatesTags: ["Order"],
    }),
    cancelOrderDetails: builder.mutation({
      query: ({ orderDetailIds, masterid }) => ({
        url: `/fooditemsedit`,
        method: "PATCH",
        body: { orderDetailIds, masterid },
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderMasterStatus: builder.mutation({
      query: ({ orderid, status }) => ({
        url: `/ordermasterstatus/${orderid}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["ActiveTakeAway"],
    }),
    updateOrderDetailsStatus: builder.mutation({
      query: ({ orderid, status }) => ({
        url: `/orderdetailsstatus/${orderid}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["ActiveTakeAway"],
    }),
    getActiveDineInOrders: builder.query({
      query: () => `/getactivedineinorders`,
      providesTags: ["Order"],
    }),
    getActiveTakeAwayOrders: builder.query({
      query: () => `/getactivetakeawayorders`,
      providesTags: ["ActiveTakeAway"],
    }),
    getCompletedDineInOrders: builder.query({
      query: () => `/getcompleteddineinorders`,
      providesTags: ["Order"],
    }),
    getCompletedTakeAwayOrders: builder.query({
      query: () => `/getcompletedtakeawayorders`,
      providesTags: ["Order"],
    }),
    createPosDineInOrder: builder.mutation({
      query: ({ orderdetails, tableid, userid }) => ({
        url: "/posdineineorders",
        method: "POST",
        body: { orderdetails, tableid, userid },
      }),
    }),
    createPosTakeAwayOrder: builder.mutation({
      query: ({ orderdetails, userid }) => ({
        url: "/postakeawayorders",
        method: "POST",
        body: { orderdetails, userid },
      }),
    }),
    addExistingTakeAwayOrder: builder.mutation({
      query: ({ fooditems, ordermaster }) => ({
        url: `/addexistingtakeawayorder/${ordermaster}`,
        method: "POST",
        body: { fooditems },
      }),
      invalidatesTags: ["ActiveTakeAway"],
    }),
    cancelTakeAwayPendingOrder: builder.mutation({
      query: (itemstoremove) => ({
        url: `/canceltakeawayorderdetails`,
        method: "PATCH",
        body: itemstoremove,
      }),
      invalidatesTags: ["ActiveTakeAway"],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetCreatedOrderQuery,
  useCancelOrderMasterMutation,
  useCancelOrderDetailsMutation,
  useUpdateOrderMasterStatusMutation,
  useUpdateOrderDetailsStatusMutation,
  useGetActiveDineInOrdersQuery,
  useGetActiveTakeAwayOrdersQuery,
  useGetCompletedDineInOrdersQuery,
  useGetCompletedTakeAwayOrdersQuery,
  useCreatePosDineInOrderMutation,
  useCreatePosTakeAwayOrderMutation,
  useAddExistingTakeAwayOrderMutation,
  useCancelTakeAwayPendingOrderMutation,
} = Orderapi;
