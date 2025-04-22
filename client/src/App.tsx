import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./utils/Auth";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={!isAuthenticated ? <LoginForm /> : <Navigate to="/home" replace />}
        />

        {/* Signup Route */}
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupForm /> : <Navigate to="/home" replace />}
        />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;