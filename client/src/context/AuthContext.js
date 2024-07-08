import React, { createContext, useState, useContext } from "react";
import { loginAdmin, loginCustomer } from "./AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = async (username, password, type) => {
    let userData;
    if (type === "admin") {
      userData = await loginAdmin(username, password);
    } else {
      userData = await loginCustomer(username, password);
    }
    setUser(userData.user);
    setRole(userData.role);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
