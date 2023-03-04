import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./Taskslice";

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});

export default store;
