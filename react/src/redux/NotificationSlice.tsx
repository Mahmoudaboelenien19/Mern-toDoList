import { createSlice } from "@reduxjs/toolkit";

export interface notificationInterface {
  _id?: string;
  state: string;
  time: string;
  isRead: boolean;
  content: string;
  count: number;
}

const initialState = {
  notificationArr: [] as notificationInterface[],
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
  },
});

export const { addtoNotificationArr, removeNotification, isReadNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
