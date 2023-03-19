import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./Taskslice";
const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});

export default store;
export type RootType = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
