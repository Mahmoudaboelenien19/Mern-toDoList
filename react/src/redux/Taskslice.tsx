import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import Task from "../components/Task";

const date = () => new Date().toLocaleDateString();
const time = () => new Date().toLocaleTimeString();

export interface Task {
  id: number;
  task: string;
  time: string;
  date: string;
  state: string;
  isChecked: boolean;
}

export interface tasksState {
  isError: boolean;
  tasks: Task[];
  isLoading: boolean;
}

const initialState: tasksState = {
  isLoading: false,
  tasks: [],
  isError: false,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {},
  extraReducers: {},
});
