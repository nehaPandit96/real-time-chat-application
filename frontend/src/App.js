// frontend/src/App.js
import React, { useContext, useState } from "react";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthContext } from "./context/AuthContext";
import "./App.css";
import ProtectedRoute from "./context/ProtectedRoute";

const App = () => {
  const { logout } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const logoutBtn = async (e) => {
    e.preventDefault();
    try {
      await logout();

      navigate("/");
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      <div className="flex bg-sky-700 text-zinc-50 p-5 px-3">
        {/* Navigation bar with links */}

        <nav className="navbarContainer px-4">
          <div>
            <Link to="/" className="text-lg mr-4">
              Home
            </Link>
            <Link to="/chat" className="text-lg mr-4">
              Chat
            </Link>
          </div>

          <div>
            {username && (
              <>
                <span className="username">Welcome {username}</span>
                <button onClick={logoutBtn}>Logout</button>
              </>
            )}
            {!username && (
              <>
                <Link to="/login" className="text-lg mr-4">
                  Login
                </Link>
                <Link to="/register" className="text-lg">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
