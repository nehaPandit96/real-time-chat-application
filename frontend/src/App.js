// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <div className="flex bg-sky-700 text-zinc-50 p-5 px-3">
        {/* Navigation bar with links */}
        <nav className="mb-4">
          <Link to="/" className="text-lg mr-4">
            Home
          </Link>
          <Link to="/chat" className="text-lg mr-4">
            Chat
          </Link>
          <Link to="/login" className="text-lg mr-4">
            Login
          </Link>
          <Link to="/register" className="text-lg">
            Register
          </Link>
        </nav>
      </div>

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
