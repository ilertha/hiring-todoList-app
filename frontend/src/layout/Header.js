import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { logout } from "../features/auth/authSlice"; // Import the logout action
import { AlignItems, HeaderSection, LogoImg, LogoTitle } from "../components/StyledComponent/headerStyle";
import { ToggleBtn } from "../components/UI/Button";
import { LogOutIcon } from "../components/StyledComponent/headerStyle";
import { logo } from "../assets";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleLogout = () => {
    // Dispatch the logout action to clear the user data in Redux
    dispatch(logout());

    // Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

  return (
    <HeaderSection>
      <LogoTitle>To-Do</LogoTitle>
      <LogoImg src={logo} alt="logo" />
      <AlignItems>
        <ToggleBtn checked={isDarkMode} handleChange={() => dispatch(toggleTheme())} />
        <LogOutIcon onClick={handleLogout} />
      </AlignItems>
    </HeaderSection>
  );
};

export default Header;
