import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    visibility: false,
    severity: "",
    message: "",
  },
  reducers: {
    show: (state, action) => {
      state.visibility = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    hide: (state) => {
      state.visibility = false;
      state.severity = "";
      state.message = "";
    },
  },
});

export const { show, hide } = alertSlice.actions;
export default alertSlice.reducer;
