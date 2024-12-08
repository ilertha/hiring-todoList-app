import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { AuthReducer, SignInReducer } from "./auth/AuthReducer";
import todoReducer from "./TodoList/todoReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    signIn: SignInReducer,
    todos: todoReducer
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk) as any);


export default store

export type AppDispatch = typeof store.dispatch
export type State = RootState