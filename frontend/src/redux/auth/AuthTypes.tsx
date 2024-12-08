export const SIGNUP = "SIGNUP";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST"

export const SIGNIN = "SIGNIN";
export const SIGNIN_REQUEST = "SIGNIN_REQUEST"

export interface SignUpType {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

export interface SignInType{
    email: string;
    password: string;
}

interface SetUserAction {
    type: typeof SIGNUP;
    payload: SignUpType;
}

interface SetSignAction{
    type: typeof SIGNIN;
    payload: SignInType;
}

interface RegisterRequestAction {
    type: typeof SIGNUP_REQUEST;
}

interface SigninRequestAction{
    type: typeof SIGNIN_REQUEST;
}

export interface AuthState {
    user: SignUpType;
    error: string | null;
}


export type AuthActionTypes =
| SetUserAction
| RegisterRequestAction
| SetSignAction
| SigninRequestAction
;