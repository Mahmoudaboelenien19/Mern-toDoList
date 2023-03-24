import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./Taskslice";
import notificationSlice from "./NotificationSlice";
const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    notification: notificationSlice,
  },
});

export default store;
export type RootType = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
