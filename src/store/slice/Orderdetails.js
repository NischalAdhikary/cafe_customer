import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordermaster: null,
  ordersdetails: [],
  newOrderDetails: [],
  removedOrderDetails: [],
};

const OrderdetailSlice = createSlice({
  name: "activeorder",
  initialState,
  reducers: {
    setOrderMaster: (state, action) => {
      state.ordermaster = action.payload;
    },
    setOrderDetails: (state, action) => {
      state.ordersdetails = action.payload;
    },
    setExistingOrderDetails: (state, action) => {
      state.ordersdetails.push(action.payload);
    },
    setNewOrderDetails: (state, action) => {
      state.newOrderDetails.push(action.payload);
    },
    setAddExisitingOrderDetails: (state, action) => {
      const price = action.payload.price;
      state.ordersdetails.push({
        orderdetailid: `temp_${Date.now()}_${Math.random()}`,
        foodid: action.payload.foodid,
        fooditems: action.payload,
        quantity: 1,
        price,
      });
    },
    emptyNewOrderDetails: (state, action) => {
      state.newOrderDetails = [];
    },

    removeExistingOrderdetails: (state, action) => {
      state.ordersdetails = state.ordersdetails.filter(
        (item) => item.foodid !== action.payload.foodid
      );
    },

    removeSingleOrderDetails: (state, action) => {
      const index = state.ordersdetails.findIndex(
        (item) => item.foodid === action.payload.foodid
      );
      if (index !== -1) {
        state.ordersdetails.splice(index, 1);
      }
    },
    setItemsToRemove: (state, action) => {
      state.removedOrderDetails.push(action.payload);
    },

    clearRemovedOrderDetails: (state) => {
      state.removedOrderDetails = [];
    },
  },
});

export const {
  setOrderDetails,
  setOrderMaster,
  setNewOrderDetails,
  setExistingOrderDetails,
  emptyNewOrderDetails,
  setAddExisitingOrderDetails,
  removeExistingOrderdetails,
  removeSingleOrderDetails,

  setEditOrderDetails,
  setItemsToRemove,

  clearRemovedOrderDetails,
} = OrderdetailSlice.actions;

export default OrderdetailSlice.reducer;
