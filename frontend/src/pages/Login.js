import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice'; // Import login action from Redux slice
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link for navigation
import {
  AuthLink,
  AuthMainImg,
  SignUp,
  SignUpContainer,
  SignUpContent,
  SignUpForm,
  SignUpLeftWrapper,
  SignUpTitle,
} from '../components/StyledComponent/authStyle';  // Styled components for design
import AuthInput from '../components/UI/AuthInput'; // Custom Input component
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';  // Email and Password icons
import { AuthButton } from '../components/UI/Button'; // Custom button component
import { signinImg } from '../assets';  // Import image for sign-in page
import Alert from '@mui/material/Alert';  // Material UI Alert component for displaying error messages
import Box from '@mui/material/Box';  // Material UI Box for styling

const Login = () => {
  const dispatch = useDispatch();
  
  // Manage form data for email and password
  const [formData, setFormData] = useState({ email: '', password: '' });

  // State to store error messages
  const [errorMessage, setErrorMessage] = useState('');

  // State to handle form submission loading status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle change in input fields (email or password)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission, validate input and attempt login
  const handleSubmit = async (e) => {
    e.preventDefault();   // Prevent form from reloading the page
    setIsSubmitting(true); // Indicate that submission is in progress
    setErrorMessage('');   // Clear any previous error messages

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

    // Check if any fields are empty
    if (!formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      setIsSubmitting(false);  // Reset the submitting status
      return;
    }

    // Validate email format using the regex
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Invalid email address.');
      setIsSubmitting(false);  // Reset the submitting status
      return;
    }

    // Try to send login request to the backend API
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', formData);
      dispatch(login(response.data));  // Dispatch login action to Redux store with response data
      setFormData({ email: '', password: '' });  // Clear the form data after successful login
    } catch (error) {
      // If there's an error, show the message from backend or a generic one
      setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      // After the try/catch block, stop showing loading state
      setIsSubmitting(false);
    }
  };

  return (
    <SignUp>  {/* Main container for the sign-up/login page */}
      <SignUpContainer>  {/* Wrapper for content */}
        <SignUpContent>
          <SignUpForm>
            {/* Left part: sign-in image and link to create a new account */}
            <SignUpLeftWrapper>
              <AuthMainImg src={signinImg} alt="signinImg" />  {/* Display the sign-in image */}
              <br />
              <Link to="/register">  {/* Link to the register page */}
                <AuthLink>Create New Account!</AuthLink>
              </Link>
            </SignUpLeftWrapper>

            {/* Right part: form fields and submission */}
            <SignUpLeftWrapper>
              <SignUpTitle>Sign In</SignUpTitle>  {/* Title for the form */}

              {/* Input fields for email and password */}
              <AuthInput
                icon={<AiOutlineMail />}  // Email icon
                name="email"
                placeholder="Please Input your email!"
                type="email"
                handleChange={handleChange}
              />
              <AuthInput
                icon={<AiOutlineLock />}  // Password icon
                name="password"
                placeholder="Please Input your password!"
                type="password"
                handleChange={handleChange}
              />

              {/* Display error message if validation fails */}
              <Box sx={{ my: 2 }}>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              </Box>

              {/* Submit Button */}
              <AuthButton
                title={isSubmitting ? 'Logging in...' : 'Sign In'}  // Display button text based on the loading status
                handleSubmit={handleSubmit}
                disabled={isSubmitting}  // Disable the button while submitting
              />
            </SignUpLeftWrapper>
          </SignUpForm>
        </SignUpContent>
      </SignUpContainer>
    </SignUp>
  );
};

export default Login;
