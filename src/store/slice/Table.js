import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  table: [],
};
console.log("From slice tables", initialState);
const Tableslice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action) => {
      state.table = action.payload;
    },
    editTablestatus: (state, action) => {
      console.log("before update change ", current(state.table));
      const tableIndex = state.table.findIndex(
        (item) => item.tableid === action.payload.tableid
      );

      if (tableIndex !== -1) {
        state.table[tableIndex].status = action.payload.status;
      }
      console.log("after update change ", current(state.table));
    },
    createTable: (state, action) => {
      state.table.push(action.payload);
    },
    deleteTable: (state, action) => {
      state.table = state.table.filter(
        (item) => item.tableid !== action.payload.tableid
      );
    },
    updateTable: (state, action) => {
      const updateIndex = state.table.findIndex(
        (item) => item.tableid === action.payload.tableid
      );
      if (updateIndex !== -1) {
        state.table[updateIndex] = action.payload;
      }
    },
  },
});
console.log("From slice tables", Tableslice);
export const {
  setTable,
  editTablestatus,
  deleteTable,
  createTable,
  updateTable,
} = Tableslice.actions;
export default Tableslice.reducer;
