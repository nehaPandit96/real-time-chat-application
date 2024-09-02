import React, { createContext, useState } from "react";
import axios from "../axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      setUser(res.data.user);
    } catch (error) {
      console.error("Login failed:", error.response.data.msg);
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post("/api/auth/register", { username, password });
    } catch (error) {
      console.error("Registration failed:", error.response.data.msg);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      localStorage.clear();
    } catch (error) {
      console.error("Logout failed:", error.response.data.msg);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
