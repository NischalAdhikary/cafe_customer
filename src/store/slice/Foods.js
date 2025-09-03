import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fooditems: [],
};
const Foodslice = createSlice({
  name: "fooditems",
  initialState,
  reducers: {
    setFoodItems: (state, action) => {
      state.fooditems = action.payload;
    },
  },
});
export const { setFoodItems } = Foodslice.actions;
export default Foodslice.reducer;
