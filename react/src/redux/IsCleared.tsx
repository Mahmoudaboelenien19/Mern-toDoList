import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCleared: false,
};
const isClearedSlice = createSlice({
  name: "iscleared",
  initialState,
  reducers: {
    handleIsClearedSlice(state, action) {
      state.isCleared = action.payload;
    },
  },
});

export const { handleIsClearedSlice } = isClearedSlice.actions;
export default isClearedSlice.reducer;
