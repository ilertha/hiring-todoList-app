import React, { ChangeEvent, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser, registerUser } from "../../redux/auth/AuthAction";
import { 
  AuthLabel,
  FormTitle,
  InputBoxes,
  InputBox,
  InputIcon,
  AuthInput,
  SubmitButton,
  SignUpText,
  AuthBtnWrapper,
  AlignItems,
} from "../../components/StyledComponent/user";
import { LogoImg } from "../../components/StyledComponent/home";
import logo from "../../assets/logo.svg"
import "./user.css";

const SignUpForm: React.FC<PropsFromRedux> = ({
  user,
  error,
  setUser,
  registerUser,
}) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = (name: string, value: string): string => {
    let error = "";
    if (name === "username" && !value.trim()) {
      error = "Username is required!";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = "Email is required!";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email format!";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required!";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters!";
      }
    } else if (name === "repassword") {
      if (!value) {
        error = "Please confirm your password!";
      } else if (value !== user.password) {
        error = "Passwords do not match!";
      }
    }
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Validate field on change
    const error = validate(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
    const errors: Record<string, string> = {};

    // Validate all fields
    Object.keys(user).forEach((key) => {
      const fieldError = validate(key, (user as any)[key]);
      if (fieldError) {
        errors[key] = fieldError;
      }
    });

    setValidationErrors(errors);

    // Submit if no errors
    if (Object.keys(errors).length === 0) {
      registerUser(user);
      window.location.reload()
    }
  };

  return (
    <div className="signup-form">
      <AlignItems>
        <LogoImg src={logo} alt="logo" />
        <FormTitle className="title">Sign Up</FormTitle>
      </AlignItems>
      <InputBoxes>
        <InputBox>
          <InputIcon className="fas fa-user"></InputIcon>
          <AuthInput
            type="text"
            name="username"
            placeholder="Enter your name"
            onChange={handleChange}
            value={user.username}
          />
        </InputBox>
        {validationErrors.username && <p className="error">{validationErrors.username}</p>}

        <InputBox>
          <InputIcon className="fas fa-envelope"></InputIcon>
          <AuthInput
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={user.email}
          />
        </InputBox>
        {validationErrors.email && <p className="error">{validationErrors.email}</p>}

        <InputBox>
          <InputIcon className="fas fa-lock"></InputIcon>
          <AuthInput
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={user.password}
          />
        </InputBox>
        {validationErrors.password && <p className="error">{validationErrors.password}</p>}

        <InputBox>
          <InputIcon className="fas fa-lock"></InputIcon>
          <AuthInput
            type="password"
            name="repassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={user.repassword}
          />
        </InputBox>
        {validationErrors.repassword && <p className="error">{validationErrors.repassword}</p>}

        <AuthBtnWrapper>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </AuthBtnWrapper>
        {error && <p className="error">{error}</p>}

        <SignUpText>
          Already have an account? <AuthLabel htmlFor="flip">Login now</AuthLabel>
        </SignUpText>
      </InputBoxes>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  error: state.auth.error,
});

const mapDispatchToProps = {
  setUser,
  registerUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignUpForm);
