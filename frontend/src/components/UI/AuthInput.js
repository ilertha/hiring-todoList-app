import React from "react";
import { AuthInputForm, FormGroup, InputIconWrapper } from "../StyledComponent/authStyle";

// Functional component for creating a reusable authentication input field
const AuthInput = ({ handleChange, icon, placeholder, name, type }) => {
  return (
    // Form group container for the input and its associated icon
    <FormGroup>
      {/* Wrapper for the input icon */}
      <InputIconWrapper>
        {icon}
      </InputIconWrapper>
      {/* Styled input field with props for dynamic behavior */}
      <AuthInputForm
        onChange={handleChange} // Function to handle input value changes
        type={type}             // Input type (e.g., text, password, email)
        name={name}             // Name of the input field
        placeholder={placeholder} // Placeholder text for the input
      />
    </FormGroup>
  );
}

export default AuthInput;
