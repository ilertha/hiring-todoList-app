import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import todosReducer from "./features/todos/todosSlice";
import themeReducer from './features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    theme: themeReducer,
  }
})