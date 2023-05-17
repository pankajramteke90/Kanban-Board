import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../types";

interface KanbanState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: KanbanState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("kanban/fetchTasks", async () => {
  const response = await axios.get<Task[]>("http://localhost:3001/tasks");
  return response.data;
});

export const addTask = createAsyncThunk(
  "kanban/addTask",
  async (task: Task) => {
    const response = await axios.post<Task>(
      "http://localhost:3001/tasks",
      task
    );
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "kanban/updateTask",
  async ({ id, status }: { id: string; status: Task["status"] }) => {
    const response = await axios.patch<Task>(
      `http://localhost:3001/tasks/${id}`,
      { status }
    );
    return response.data;
  }
);

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index].status = action.payload.status;
        }
      });
  },
});

export default kanbanSlice.reducer;
