import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// API URL of the backend server
const API_URL = "http://localhost:8000/api/v1/list";

// Initial state for the todos slice
const initialState = {
  todos: [],       // Array to hold the todos
  status: 'idle',   // Status of the request (idle, loading, succeeded, failed)
  error: null,      // Error object in case of request failure
};

// Helper function to get the authentication token from session storage
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token, // Pass the token as Authorization header
  };
};

// Async Thunks to handle asynchronous requests

// Fetch all todos from the backend
export const fetchTodos = createAsyncThunk('list/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data; // On success, return the fetched todos
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message); // On failure, reject with the error message
  }
});

// Add a new todo
export const addTodo = createAsyncThunk('list/addTodo', async (newTodo, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, newTodo, { headers: getAuthHeaders() });
    return response.data; // Return the new todo on success
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message); // Handle errors
  }
});

// Update an existing todo
export const updateTodo = createAsyncThunk('list/updateTodo', async ({ uuid, updatedTodo }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/${uuid}`, updatedTodo, { headers: getAuthHeaders() });
    return response.data; // Return the updated todo on success
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message); // Handle errors
  }
});

// Remove a todo from the list
export const removeTodo = createAsyncThunk('list/removeTodo', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return id; // Return the id of the deleted todo for removal from the store
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message); // Handle errors
  }
});

// Toggle the completion status of a todo
export const toggleCompleted = createAsyncThunk('list/toggleCompleted', async({uuid, completed}, {rejectWithValue}) => {
  try{
    const response = await axios.post(
      `${API_URL}/${uuid}`, {completed}, {headers: getAuthHeaders()}
    );
    return response.data; // Return the updated todo status
  }catch(error){
    return rejectWithValue(error.response?.data || error.message); // Handle errors
  }
});

// The main todosSlice, handling all actions and managing state changes
const todosSlice = createSlice({
  name: "todos",     // Name of the slice (used for state identification)
  initialState,      // Initial state defined above
  reducers: {},      // We have no synchronous reducers here
  extraReducers: (builder) => {
    // Handle various async actions
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';  // Set loading status when fetching starts
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Set succeeded status and store todos on success
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';    // Set failed status and capture error
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos = [action.payload, ...state.todos]; // Add new todo at the beginning of the list
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload; // Capture the error
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.uuid === action.payload.uuid); // Find the index of updated todo
        if (index !== -1) state.todos[index] = action.payload; // Update the todo at the found index
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload; // Capture the error
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.uuid !== action.payload); // Remove the deleted todo by its ID
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload; // Capture the error
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex((todo) => todo.uuid === updatedTodo.uuid); // Find the index of updated todo
        if (index !== -1) {
          state.todos[index].completed = updatedTodo.completed; // Update the completion status of the todo
        }
      });
  },
});

// Export the reducer for use in the store
export default todosSlice.reducer;
