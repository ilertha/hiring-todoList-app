import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";

// A functional component for toggling between dark and light themes
const ToggleTheme = () => {
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Hook to retrieve the current theme state from the Redux store
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    // Button that toggles the theme by dispatching the toggleTheme action
    <button onClick={() => dispatch(toggleTheme())}>
      {/* Display the button label based on the current theme state */}
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}

export default ToggleTheme;
