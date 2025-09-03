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
      const itemId = action.payload.foodid || action.payload.id;
      const existingitem = state.items.find((item) => item.id === itemId);

      if (existingitem) {
        existingitem.quantity++;
      } else {
        const normalizedItem = {
          ...action.payload,
          id: itemId,
          quantity: 1,
        };
        state.items.push(normalizedItem);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload.foodid || action.payload.id;
      const existingitem = state.items.find((item) => item.id === itemId);

      if (existingitem && existingitem.quantity > 1) {
        existingitem.quantity--;
      } else {
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
    deleteItems: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      state.items = [];
    });
  },
});

export const { addToCart, removeFromCart, clearCart, deleteItems } =
  cartSlice.actions;
export default cartSlice.reducer;
