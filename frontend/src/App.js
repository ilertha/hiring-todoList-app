import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* Catch-All Route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
