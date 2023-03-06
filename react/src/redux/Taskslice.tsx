import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Task from "../components/Task";
import { createToDoRoute, getAllToDosRoute } from "../../routes";
import cookies from "js-cookie";

const date = () => new Date().toLocaleDateString();
const time = () => new Date().toLocaleTimeString();
const userId = cookies.get("user-id");

export const addTodo = createAsyncThunk(
  "tasks/addTodo",
  async (content: string, thunk) => {
    const todo = {
      content,
      time: time(),
      date: date(),
      state: "created",
      isCompleted: false,
    };
    const { rejectWithValue } = thunk;
    return await axios
      .post(createToDoRoute(userId as string), todo)
      .then(({ data }) => data)
      .catch(({ response: { data } }) => rejectWithValue(data));
  }
);

export const getAllTodos = createAsyncThunk(
  "tasks/getAllTodos",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    return await axios
      .get(getAllToDosRoute(userId as string))
      .then(({ data }) => data)
      .catch(({ response: { data } }) => rejectWithValue(data));
  }
);
export interface Task {
  _id?: string;
  content: string;
  time: string;
  date: string;
  state: string;
  isCompleted: boolean;
}

export interface tasksState {
  isError: boolean;
  tasks: Task[];
  isLoading: boolean;
  errMsg: string;
}

const initialState: tasksState = {
  isLoading: false,
  tasks: [],
  isError: false,
  errMsg: "",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {},
  extraReducers(builder) {
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errMsg = "";
    });

    builder.addCase(addTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getAllTodos.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.tasks = action.payload.result;
      state.errMsg = "";
    });

    builder.addCase(getAllTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default taskSlice.reducer;
