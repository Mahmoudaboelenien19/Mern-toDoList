import { createSlice } from "@reduxjs/toolkit";

export interface notificationInterface {
  _id?: string;
  state: string;
  time: string;
  isRead: boolean;
  content: string;
}

const initialState = {
  notificationArr: [] as notificationInterface[],
  counter: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addtoNotificationArr(state, action) {
      if (Array.isArray(action.payload)) {
        state.notificationArr = action.payload;
      } else {
        state.notificationArr = [action.payload, ...state.notificationArr];
      }
      state.counter++;
    },

    removeNotification(state, action) {
      const index = state.notificationArr.findIndex(
        (e) => e._id === action.payload
      );
      state.notificationArr.splice(index, 1);
    },

    isReadNotification(state, action) {
      state.notificationArr = state.notificationArr.map((e) =>
        e._id === action.payload ? { ...e, isRead: true } : e
      );
    },

    notificationCounter(state, action) {
      state.counter = action.payload;
    },

    notificationCounterReset(state) {
      state.counter = 0;
    },

    markALlRead(state) {
      state.notificationArr = state.notificationArr.map((e) => ({
        ...e,
        isRead: true,
      }));
    },
  },
});

export const {
  notificationCounterReset,
  notificationCounter,
  addtoNotificationArr,
  removeNotification,
  isReadNotification,
  markALlRead,
} = notificationSlice.actions;
export default notificationSlice.reducer;
