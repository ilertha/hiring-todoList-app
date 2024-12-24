import { createSlice } from '@reduxjs/toolkit';

const userFromSession = sessionStorage.getItem('user')
  ? JSON.parse(sessionStorage.getItem('user'))
  : null;

const initialState = {
  user: userFromSession,
  isAuthenticated: !!sessionStorage.getItem('isAuthenticated'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload;

      // Save to Redux state
      state.user = userData;
      state.isAuthenticated = true;

      // Save to sessionStorage
      sessionStorage.setItem('token', userData.token);
      sessionStorage.setItem('isAuthenticated', 'true');
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Clear sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('isAuthenticated');
    },
    register: (state, action) => {
      const userData = action.payload;

      // Save to Redux state
      state.user = userData;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
