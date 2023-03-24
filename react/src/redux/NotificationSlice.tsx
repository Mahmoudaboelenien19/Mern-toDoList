import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { addNotificationRoute } from "../../routes";
import { addTodo } from "./Taskslice";

interface notificationInterface {
  _id?: string;
  state: string;
  time: string;
  isRead: boolean;
  content: string;
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
        state.notificationArr = [...state.notificationArr, action.payload];
      }
    },
    removeNotification(state, action) {
      state.notificationArr = state.notificationArr.filter(
        (e) => e._id !== action.payload
      );
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
