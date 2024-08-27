// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const res = await axios.post("/api/auth/login", { username, password });
    setUser(res.data.user);
  };

  const register = async (username, password) => {
    await axios.post("/api/auth/register", { username, password });
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
