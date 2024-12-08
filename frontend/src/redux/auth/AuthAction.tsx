import { Dispatch } from "redux";
import axios from "axios";
import endpoint from "../../config/config";
import { 
  SIGNUP, SIGNUP_REQUEST, SIGNIN, SIGNIN_REQUEST,
  SignUpType, SignInType, AuthActionTypes 
} from "./AuthTypes";

// Actions
export const setUser = (user: SignUpType): AuthActionTypes => ({
  type: SIGNUP,
  payload: user,
});

export const signUser = (user: SignInType): AuthActionTypes => ({
  type: SIGNIN,
  payload: user,
});

export const registerRequest = (): AuthActionTypes => ({
  type: SIGNUP_REQUEST,
});

export const signinRequest = (): AuthActionTypes => ({
  type: SIGNIN_REQUEST,
});

// API calls
export const registerUser = (user: SignUpType) => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch(registerRequest());
  try {
    await axios.post(`${endpoint}/auth/register`, user);
  } catch (error) {
    console.error("Could not Sign Up!", error);
  }
};

export const signinUser = (user: SignInType) => async (dispatch: Dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });

  try {
    const res = await axios.post(`${endpoint}/auth/login`, user);
    return res.data; // This should return token and uuid
  } catch (error: any) {
    dispatch({
      type: SIGNIN_REQUEST,
      payload: error.response?.data?.message || "An error occurred",
    });
    throw error; // This will trigger the error handling in the component
  }
};