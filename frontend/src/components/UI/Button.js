import React from "react";
import { 
  MoonIcon, 
  Slider, 
  SunIcon, 
  SwitchInput, 
  SwitchWrapper, 
  ToggleThemeWrapper 
} from "../StyledComponent/headerStyle";
import { RegisterButton } from "../StyledComponent/authStyle";

const ToggleBtn = ({ handleChange, checked }) => {
  return(
    <ToggleThemeWrapper>
      <SunIcon />
      <SwitchWrapper>
        <SwitchInput type="checkbox" onChange={handleChange} checked={checked} />
        <Slider />
      </SwitchWrapper>
      <MoonIcon />
    </ToggleThemeWrapper>
  )
}

const AuthButton = ({handleSubmit, title}) => {
  return(
   <RegisterButton onClick={handleSubmit}>{title}</RegisterButton>
  )
}

export {
  ToggleBtn,
  AuthButton,
};