import { 
  AuthActionTypes, SIGNUP, SIGNUP_REQUEST, SIGNIN, SIGNIN_REQUEST,
  AuthState 
} from "./AuthTypes";

const initialSignUpState = {
  user: {
    username: "",
    email: "",
    password: "",
    repassword: "",
  },
  error: null,
}

const initialSignInState = {
  user: {
    email: "",
    password: ""
  },
  error: null
}
  
const AuthReducer = (
  state = initialSignUpState,
  action: AuthActionTypes
): AuthState => {
  switch(action.type){
    case SIGNUP:
      return{ ...state, user: action.payload}
    case SIGNUP_REQUEST:
      return{...state, error: null}
    default:
      return state;
  }
}

const SignInReducer = (
  state = initialSignInState,
  action: AuthActionTypes
) => {
  switch(action.type){
    case SIGNIN:
      return{...state, user: action.payload, error: null}
    case SIGNIN_REQUEST:
      return{...state, error: null}
    default: 
      return state;
  }
}

export {
  AuthReducer,
  SignInReducer
}
