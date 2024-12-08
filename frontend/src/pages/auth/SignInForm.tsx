import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { signUser, signinUser } from "../../redux/auth/AuthAction";
import { useNavigate } from "react-router-dom";
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
import logo from "../../assets/logo.svg";
import auth from "../../api/auth/auth-helper";

const SignInForm: React.FC<PropsFromRedux> = ({
  user,
  error,
  signUser,
  signinUser,
}) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    signUser({ ...user, [name]: value });

    // Resetting errors on each input change
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async () => {
    let errors = { email: "", password: "" };

    if (!validateEmail(user.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!user.password) {
      errors.password = "Password is required.";
    }

    if (errors.email || errors.password) {
      setFormErrors(errors);
      return;
    }

    try {
      const data = await signinUser(user);
      auth.authenticate(data, () => {
        if (sessionStorage.getItem("jwt") === JSON.stringify(data.token)) {
          navigate(`/home/`);
        } else {
          navigate(`/`);
        }
      });
    } catch (err:any) {
    //   Handle backend error response and display it
      if (err.response && err.response.data && err.response.data.error) {
        setFormErrors({
          ...formErrors,
          password: err.response.data.error, // Display password error message from backend
        });
      }
    }
  };

  return (
    <div className="login-form">
      <AlignItems>
        <LogoImg src={logo} alt="logo" />
        <FormTitle className="title">Login</FormTitle>
      </AlignItems>
      <InputBoxes>
        <InputBox>
          <InputIcon className="fas fa-envelope"></InputIcon>
          <AuthInput
            type="text"
            placeholder="Enter your email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </InputBox>
        {formErrors.email && <p className="error">{formErrors.email}</p>}
        <InputBox>
          <InputIcon className="fas fa-lock"></InputIcon>
          <AuthInput
            type="password"
            placeholder="Enter your password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </InputBox>
        {formErrors.password && <p className="error">{formErrors.password}</p>}
        <AuthBtnWrapper>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </AuthBtnWrapper>
        {error && <p className="error">{error}</p>}
        <SignUpText>
          Don't have an account? <AuthLabel htmlFor="flip">Signup now</AuthLabel>
        </SignUpText>
      </InputBoxes>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.signIn.user,
  error: state.signIn.error,
});

const mapDispatchToProps = {
  signUser, // signUser action should correctly update the 'user' state
  signinUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignInForm);
