import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./HomePage";
import SignUpPage from "./Signup";
import LoginPage from "./Login";
import TaskPage from "./TaskPage";
import MyNavbar from "./Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser); // Debugging
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
      setIsLoggedIn(true); // Update login status
    }
  }, []);

  const handleLogin = (userData) => {
    console.log("User Data to Store:", userData); // Debugging
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData); // Ensure user is set
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="container">
        {isLoggedIn && <MyNavbar onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/task" />
              ) : (
                <SignUpPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/task" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/task"
            element={isLoggedIn ? <TaskPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
