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

interface Todo {
  title: string;
  description: string;
  duedate: any;
  completed: boolean;
  important: boolean;
  uuid?: string;
  usersUuid?: any;
}

export interface TodoState {
  loading: boolean; 
  todos: {todos : Todo[]}; 
  error: string; 
}

const initialState: TodoState = {
  loading: false,
  todos: {todos:[]},
  error: "",
};

const todoReducer = (state = initialState, action: any): TodoState => {
  switch (action.type) {
    
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case GET_TODO_DATA_REQUEST:
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_TODO_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload, 
      };

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: {todos:state.todos.todos.filter((todo) => todo.uuid !== action.payload)}, 
      };

    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: {todos:[...state.todos.todos, action.payload]}, 
      };
    
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: {todos:state.todos.todos.map((todo) =>
          todo.uuid === action.payload.uuid ? { ...todo, ...action.payload } : todo
        ),
      }}

    case CREATE_TODO_FAILURE:
    case GET_TODO_DATA_FAILURE:
    case DELETE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, 
      };

    
    default:
      return state;
  }
};

export default todoReducer;
