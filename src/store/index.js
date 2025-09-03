// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from "./slice/Authslice";
// import { Userapi } from "./api/User";
// import Cartslice from "./slice/Cartsitems";
// import { Tableapi } from "./api/Table";
// export const store = configureStore({
//   reducer: {
//     authUser: authSlice,
//     [Userapi.reducerPath]: Userapi.reducer,
//     cartitems: Cartslice,
//     [Tableapi.reducerPath]: Tableapi.reducer,
//   },
// });
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/Authslice";
import Cartslice from "./slice/Cartsitems";
import { Userapi } from "./api/User";
import { Tableapi } from "./api/Table";
import { Categoryapi } from "./api/Category";
import { Fooditemapi } from "./api/FoodItem";
import { Orderapi } from "./api/Order";
import Tableslice from "./slice/Table";
import Orderslice from "./slice/Ordertype";
import Customerslice from "./slice/Customers";
import Categoryslice from "./slice/Category";
import OrderdetailsSlice from "./slice/Orderdetails";
export const store = configureStore({
  reducer: {
    authUser: authSlice,
    cartitems: Cartslice,
    [Userapi.reducerPath]: Userapi.reducer,
    [Tableapi.reducerPath]: Tableapi.reducer,
    [Categoryapi.reducerPath]: Categoryapi.reducer,
    [Fooditemapi.reducerPath]: Fooditemapi.reducer,
    [Orderapi.reducerPath]: Orderapi.reducer,
    ordertype: Orderslice,
    table: Tableslice,
    customers: Customerslice,
    category: Categoryslice,
    activeorder: OrderdetailsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      Userapi.middleware,
      Tableapi.middleware,
      Categoryapi.middleware,
      Fooditemapi.middleware,
      Orderapi.middleware
    ),
});
