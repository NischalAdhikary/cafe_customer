import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/Authslice";
import { Userapi } from "./api/User";
import Cartslice from "./slice/Cartsitems";
export const store = configureStore({
  reducer: {
    authUser: authSlice,
    [Userapi.reducerPath]: Userapi.reducer,
    cartitems: Cartslice,
  },
});
