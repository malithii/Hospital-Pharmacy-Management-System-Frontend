import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    wardNo: "",
    email: "",
    type: "",
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.wardNo = action.payload.wardNo;
      state.email = action.payload.email;
      state.type = action.payload.type;
    },
    logout: (state) => {
      state.username = "";
      state.wardNo = "";
      state.email = "";
      state.type = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
