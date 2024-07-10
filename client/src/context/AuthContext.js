import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  const login = (token, role) => {
    Cookies.set("token", token, { expires: 1 });
    Cookies.set("role", role, { expires: 1 });
    setUser({ token, role });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
