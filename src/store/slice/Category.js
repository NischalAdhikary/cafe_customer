import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
};
const Categoryslice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    removeCategory: (state, action) => {
      state.category = state.category.filter(
        (item) => item.categoryid !== action.payload.categoryid
      );
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.category.findIndex(
        (item) => item.categoryid === action.payload.categoryid
      );
      if (index !== -1) {
        state.category[index] = action.payload;
      }
    },
  },
});
export const { setCategory, removeCategory, addCategory, updateCategory } =
  Categoryslice.actions;
export default Categoryslice.reducer;
