import React, { createContext, useState } from "react";
import axios from "../axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const res = await axios.post("/api/auth/login", { username, password });
    setUser(res.data.user);
  };

  const register = async (fullName, username, password) => {
    await axios.post("/api/auth/register", { fullName, username, password });
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
