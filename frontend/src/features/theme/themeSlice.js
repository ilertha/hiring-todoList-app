import { createSlice } from "@reduxjs/toolkit";

// Initial state with dark mode off by default
const initialState = {
  isDarkMode: false,
}

// Creating the slice for theme management
const themeSlice = createSlice({
  name: "theme",  // The name of this slice of state
  initialState,  // The initial state defined above
  reducers: {
    // Reducer for toggling between light and dark mode
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;  // Toggle the boolean value of isDarkMode
    }
  }
})

// Exporting the action to toggle theme
export const { toggleTheme } = themeSlice.actions;

// Exporting the reducer to be included in the store
export default themeSlice.reducer;
