import {configureStore} from "@reduxjs/toolkit";
import {todoListReducer} from "../containers/TodoList/TodoListSlice";

export const store = configureStore({
  reducer: {
    list: todoListReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;