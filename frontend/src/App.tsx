import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import { ThemeProvider } from "./ThemeContext";
import auth from "./api/auth/auth-helper";

const App = () => {
  const location = useLocation(); // Get the current location
  const isAuthenticated = auth.isAuthenticated(); // Check if the user is authenticated

  return (
    <ThemeProvider>
      <Routes>
        {/* Default route: Redirect to /home if authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Auth />
          }
        />

        {/* Protected /home route */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
