import { createSlice } from "@reduxjs/toolkit";
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: user,
};
const authSlice = createSlice({
  name: "authUser",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
