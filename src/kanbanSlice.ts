import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "./types";

export const fetchTasks = createAsyncThunk("kanban/fetchTasks", async () => {
  const response = await fetch("http://localhost:3001/tasks");
  const tasks = await response.json();
  return tasks;
});

export const addTask = createAsyncThunk(
  "kanban/addTask",
  async (task: Task) => {
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    return newTask;
  }
);

export const updateTask = createAsyncThunk(
  "kanban/updateTask",
  async (task: Task) => {
    const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const updatedTask = await response.json();
    return updatedTask;
  }
);

export const deleteTask = createAsyncThunk(
  "kanban/deleteTask",
  async (taskId: string) => {
    await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: "DELETE",
    });
    return taskId;
  }
);

interface KanbanState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: KanbanState = {
  tasks: [],
  loading: false,
  error: null,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload);
        if (index !== -1) {
          state.tasks.splice(index, 1);
        }
      });
  },
});

export default kanbanSlice.reducer;
