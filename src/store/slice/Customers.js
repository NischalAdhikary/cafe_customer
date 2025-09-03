import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  customers: [],
};

const Customerslice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (user) => user.userid !== action.payload
      );
    },
    editCustomer: (state, action) => {
      const findIndex = state.customers.findIndex(
        (user) => user.userid === action.payload.userid
      );
      if (findIndex !== -1) {
        state.customers[findIndex] = action.payload;
      }
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
  },
});
export const { setCustomers, deleteCustomer, editCustomer, addCustomer } =
  Customerslice.actions;
export default Customerslice.reducer;
