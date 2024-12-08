import {
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  GET_TODO_DATA_REQUEST,
  GET_TODO_DATA_SUCCESS,
  GET_TODO_DATA_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
} from "./todoTypes";

import { Dispatch } from "redux";
import axios from "axios";

const myAxios = axios.create({
  baseURL: `http://localhost:8000/api/v1/todoList`,
});

// Fetch all todos
export const getTodoList = () => async (dispatch: Dispatch) => {
  const userId = JSON.parse(sessionStorage.getItem("userId") || '""');
  dispatch({ type: GET_TODO_DATA_REQUEST });

  try {
    const response = await myAxios.get(`/${userId}`);
    const todoList = response.data.todoList;
    dispatch({ type: GET_TODO_DATA_SUCCESS, payload: todoList });
  } catch (err) {
    dispatch({
      type: GET_TODO_DATA_FAILURE,
      payload: "Failed to fetch the todo list.",
    });
  }
};

// Create a new todo
export const createTodoList = (formData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_TODO_REQUEST });

  try {
    const response = await myAxios.post("/", formData);
    const newTodo = response.data.todoList;
    dispatch({ type: CREATE_TODO_SUCCESS, payload: newTodo });
  } catch (err) {
    dispatch({
      type: CREATE_TODO_FAILURE,
      payload: "Failed to create a new todo.",
    });
  }
};

// Delete a todo
export const deleteTodoList = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_TODO_REQUEST });

  try {
    await myAxios.delete(`/${id}`);
    dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
  } catch (err) {
    dispatch({
      type: DELETE_TODO_FAILURE,
      payload: "Failed to delete the todo.",
    });
  }
};

// Update an existing todo
export const updateTodoList = (id: string, formData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_TODO_REQUEST });

  try {
    const response = await myAxios.put(`/${id}`, formData);
    const updatedTodo = response.data.todoList;
    dispatch({ type: UPDATE_TODO_SUCCESS, payload: updatedTodo });
  } catch (err) {
    dispatch({
      type: UPDATE_TODO_FAILURE,
      payload: "Failed to update the todo.",
    });
  }
};
