import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  history: [],
};
const historyslice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    addHistory: (state, action) => {
      state.history.push(action.payload);
    },
  },
});

export const { addHistory } = historyslice.actions;
export default historyslice.reducer;
