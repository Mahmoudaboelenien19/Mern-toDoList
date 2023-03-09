import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { handleAuth } = authSlice.actions;
export default authSlice.reducer;
