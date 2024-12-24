import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Used for navigation after registration
import { useDispatch } from 'react-redux'; // For dispatching actions to Redux
import { register } from '../features/auth/authSlice'; // Action for registering the user
import axios from 'axios';
import {
  AuthLink,
  AuthMainImg,
  SignUp,
  SignUpContainer,
  SignUpContent,
  SignUpForm,
  SignUpLeftWrapper,
  SignUpTitle
} from '../components/StyledComponent/authStyle'; // Styled components for layout and UI
import AuthInput from '../components/UI/AuthInput'; // Custom input component
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai'; // Icons for inputs
import { AuthButton } from '../components/UI/Button'; // Custom button component
import { signupImg } from '../assets'; // Image for sign-up page
import { Link } from 'react-router-dom';  // Link to navigate to the login page
import { Alert } from '@mui/material';  // Material UI Alert component to show errors

const Register = () => {
  const navigate = useNavigate();  // Hook to navigate after successful registration
  const dispatch = useDispatch();  // Initialize Redux dispatch to trigger actions

  // Manage form data: username, email, password, and confirmPassword
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');  // To handle general error messages (API errors, etc.)
  const [isSubmitting, setIsSubmitting] = useState(false);  // To handle loading state during submission

  // Store validation errors for each field
  const [validationErrors, setValidationErrors] = useState({});

  // Handle changes in form inputs and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation logic
  const validateForm = () => {
    const errors = {};
    
    // Check if username, email, password, and confirmPassword fields are filled
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";

    // Password and confirm password must match
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    // Set validation errors in state
    setValidationErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no validation errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Validate the form inputs before making the API request
    const isValid = validateForm();
    if (!isValid) return;  // Stop if form is invalid

    setIsSubmitting(true); // Show loading state
    setErrorMessage(''); // Clear any previous error messages

    try {
      // Make a POST request to register the user in the backend
      const response = await axios.post('http://localhost:8000/api/v1/auth/register', formData);

      // If registration is successful, dispatch the `register` action to Redux with the user data
      dispatch(register(response.data.user));
      
      // After successful registration, redirect to the login page
      navigate("/login");

      // Reset form data after registration
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });

    } catch (error) {
      // Handle any errors returned by the backend, e.g., email already in use
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setIsSubmitting(false);  // End the submission state
    }
  };

  return (
    <SignUp>  {/* Main wrapper for sign-up page */}
      <SignUpContainer>  {/* Container for content */}
        <SignUpContent>
          <SignUpForm>
            {/* Left-side content: Sign up form */}
            <SignUpLeftWrapper>
              <SignUpTitle>Sign Up</SignUpTitle> {/* Title of the form */}

              {/* Input for username */}
              <AuthInput
                icon={<AiOutlineUser />}  // Username icon
                handleChange={handleChange}
                name="username"
                placeholder="Please Input your name!"
                type="text"
              />
              {/* Show validation error message for username if present */}
              {validationErrors.username && (
                <Alert severity="error" style={{ marginBottom: '10px' }}>
                  {validationErrors.username}
                </Alert>
              )}

              {/* Input for email */}
              <AuthInput
                icon={<AiOutlineMail />}  // Email icon
                handleChange={handleChange}
                name="email"
                placeholder="Please Input your email!"
                type="email"
              />
              {/* Show validation error message for email if present */}
              {validationErrors.email && (
                <Alert severity="error" style={{ marginBottom: '10px' }}>
                  {validationErrors.email}
                </Alert>
              )}

              {/* Input for password */}
              <AuthInput
                icon={<AiOutlineLock />}  // Password icon
                handleChange={handleChange}
                name="password"
                placeholder="Please Input your password!"
                type="password"
              />
              {/* Show validation error message for password if present */}
              {validationErrors.password && (
                <Alert severity="error" style={{ marginBottom: '10px' }}>
                  {validationErrors.password}
                </Alert>
              )}

              {/* Input for confirm password */}
              <AuthInput
                icon={<AiOutlineLock />}  // Confirm password icon
                handleChange={handleChange}
                name="confirmPassword"
                placeholder="Please Input your confirm password!"
                type="password"
              />
              {/* Show validation error message for confirmPassword if present */}
              {validationErrors.confirmPassword && (
                <Alert severity="error" style={{ marginBottom: '10px' }}>
                  {validationErrors.confirmPassword}
                </Alert>
              )}

              {/* Display general error message if any */}
              {errorMessage && (
                <Alert severity="error" style={{ marginBottom: '10px' }}>
                  {errorMessage}
                </Alert>
              )}

              {/* Submit button */}
              <AuthButton
                handleSubmit={handleSubmit}
                title={isSubmitting ? "Registering..." : "Register"}  // Button text changes based on state
                disabled={isSubmitting}  // Disable button while submitting
              />
            </SignUpLeftWrapper>

            {/* Right-side content: Sign up image and login link */}
            <SignUpLeftWrapper>
              <AuthMainImg src={signupImg} alt="signupImg" />  {/* Image for the sign-up page */}
              <br />
              <Link to="/login">
                <AuthLink>I am already a member.</AuthLink>  {/* Link to login page */}
              </Link>
            </SignUpLeftWrapper>
          </SignUpForm>
        </SignUpContent>
      </SignUpContainer>
    </SignUp>
  );
};

export default Register;
