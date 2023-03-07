import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Task from "../components/Task";
import {
  ClearALlToDosRoute,
  createToDoRoute,
  deleteToDoRoute,
  getAllToDosRoute,
  updateToDoRoute,
} from "../../routes";
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
      .then(({ data }) => data);
    // .catch(({ err: { response } }) => rejectWithValue(response.data));
  }
);

export const deleteTodo = createAsyncThunk(
  "tasks/deleteTodo",
  async (id: string, thunk) => {
    const { rejectWithValue } = thunk;
    return await axios.delete(deleteToDoRoute(id)).then(({ data }) => data);
    // .catch(({ err: { response } }) => rejectWithValue(response.data));
  }
);

interface UpdateTask {
  id: string;
  content: string;
  isChecked?: boolean;
}

export const updateTodo = createAsyncThunk(
  "tasks/updateTodo",
  async ({ id, content }: UpdateTask, thunk) => {
    const { rejectWithValue } = thunk;

    const todo = {
      content,
      time: time(),
      date: date(),
      state: "updated",
      isCompleted: false,
    };

    return await axios
      .patch(updateToDoRoute(id), todo)
      .then(({ data }) => data);
    // .catch(({ err: { response } }) => rejectWithValue(response.data));
  }
);

export const checkTodo = createAsyncThunk(
  "tasks/checkTodo",
  async ({ id, content, isChecked }: UpdateTask, thunk) => {
    const { rejectWithValue } = thunk;

    const todo = {
      content,
      time: time(),
      date: date(),
      state: isChecked ? "checked" : "unchecked",
      isCompleted: isChecked,
    };

    return await axios
      .patch(updateToDoRoute(id), todo)
      .then(({ data }) => data);
    // .catch(({ err: { response } }) => rejectWithValue(response.data));
  }
);

export const clearAllTodos = createAsyncThunk(
  "tasks/clearAllTodos",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    return await axios
      .delete(ClearALlToDosRoute(userId as string))
      .then(({ data }) => data.result)
      .catch(({ response: { data } }) => rejectWithValue(data));
  }
);

export const getAllTodos = createAsyncThunk(
  "tasks/getAllTodos",
  async (_, thunk) => {
    const { rejectWithValue } = thunk;
    return await axios
      .get(getAllToDosRoute(userId as string))
      .then(({ data }) => data.result)
      .then((data) => data.reverse())
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
  msg: string;
  isChanged: boolean;
}

const initialState: tasksState = {
  isLoading: false,
  tasks: [],
  isError: false,
  isChanged: true,
  msg: "",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {},
  extraReducers(builder) {
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
      state.isChanged = false;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.msg = action.payload.message as unknown as string;

      state.isChanged = true;
    });

    builder.addCase(addTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isChanged = true;
      state.msg = action.payload as unknown as string;
    });

    builder.addCase(getAllTodos.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.tasks = action.payload;
      state.isChanged = false;
    });

    builder.addCase(getAllTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true;
      state.isChanged = false;
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isChanged = true;
    });

    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isChanged = false;
    });

    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true;
      state.isChanged = false;
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isChanged = true;
    });

    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isChanged = false;
    });

    builder.addCase(clearAllTodos.pending, (state) => {
      state.isLoading = true;
      state.isChanged = false;
    });

    builder.addCase(clearAllTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isChanged = true;
    });

    builder.addCase(clearAllTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isChanged = false;
    });

    builder.addCase(checkTodo.pending, (state) => {
      state.isLoading = true;
      state.isChanged = false;
    });

    builder.addCase(checkTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isChanged = true;
    });

    builder.addCase(checkTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isChanged = false;
    });
  },
});

export default taskSlice.reducer;
