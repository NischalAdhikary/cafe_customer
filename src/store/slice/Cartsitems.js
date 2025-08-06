import { createSlice } from "@reduxjs/toolkit";
import { removeUser } from "./Authslice";
const initialState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cartitems",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingitem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingitem) {
        existingitem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingitem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingitem && existingitem.quantity > 1) {
        existingitem.quantity--;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      state.items = [];
    });
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
