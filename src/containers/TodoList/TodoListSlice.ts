import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ApiTaskList, Task, TaskMutation} from "../../types";

interface TodoState {
  value: TaskMutation[];
  loading: boolean;
  error: boolean;
  updateLoading: boolean;
  onFormLoading: boolean;
  onDeleteLoading: boolean;
}

const initialState: TodoState = {
  value: [],
  loading: false,
  error: false,
  updateLoading: false,
  onFormLoading: false,
  onDeleteLoading: false,
};

export const onFormSubmit = createAsyncThunk<void, Task>(
  'todoList/onSubmit',
  async (task) => {
    await axiosApi.post('/tasks.json', task);
  },
);

export const deleteTask = createAsyncThunk<void, string>(
  'todoList/deleteTask',
  async (id) => {
    await axiosApi.delete('/tasks/' + id + '.json');
  },
);

export const changeStatus = createAsyncThunk<void, TaskMutation>(
  'todoList/changeStatus',
  async (task) => {
    await axiosApi.put('/tasks/' + task.id + '.json', task);
  },
);

export const fetchTodoList = createAsyncThunk(
  'todoList/fetch',
  async () => {
    const response = await axiosApi.get<ApiTaskList>('/tasks.json');

    return Object.keys(response.data).map(id => {
      const task = response.data[id];
      return {...task, id};
    }).reverse();
  },
);

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodoList.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTodoList.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(fetchTodoList.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(changeStatus.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(changeStatus.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(changeStatus.rejected, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(onFormSubmit.pending, (state) => {
      state.onFormLoading = true;
    });
    builder.addCase(onFormSubmit.fulfilled, (state) => {
      state.onFormLoading = false;
    });
    builder.addCase(onFormSubmit.rejected, (state) => {
      state.onFormLoading = false;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.onDeleteLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.onDeleteLoading = false;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.onDeleteLoading = false;
    });
  },
});

export const todoListReducer = todoListSlice.reducer;
