import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ordertype: "takeaway",
};

const Orderslice = createSlice({
  name: "ordertype",
  initialState,
  reducers: {
    setOrdertype: (state, action) => {
      state.ordertype = action.payload;
    },
  },
});

export const { setOrdertype } = Orderslice.actions;
export default Orderslice.reducer;
