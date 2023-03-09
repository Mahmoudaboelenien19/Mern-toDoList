import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./Taskslice";
import authSlice from "./isAuthSlice";
const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    auth: authSlice,
  },
});

export default store;
export type RootType = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
