import { useContext, useEffect } from "react";
import api from "../../config/axios";
import { message } from "antd";
import { Data } from "../../App";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const loginEndpoint = "/api/auth/logincustomer";

export const useUsers = () => {
  const { user, setUser } = useContext(Data);
  const navigate = useNavigate();
  useEffect(() => {
    // Load user data from localStorage when the component mounts
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  // Function to handle user login
  const onLogIn = async (username, password) => {
    try {
      const response = await api.post(loginEndpoint, { username, password });
      const { token, customerName, customerId } = response.data;

      // Set token to cookie
      Cookies.set("token", token, { expires: 7 }); // Example: set token cookie for 7 days
      console.log("Token set in cookie:", token);

      // Set user context
      const userData = { customerName, customerId };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("User context updated:", { customerId, customerName });
      message.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập."
      );
    }
  };

  const onLogOut = () => {
    Cookies.remove("token");
    setUser(null);
    localStorage.removeItem("user");
    message.success("Đã đăng xuất khỏi tài khoản");

    navigate("/");
  };

  const getCurrUser = () => {
    return user ? user.customerName : null;
  };

  return { onLogIn, onLogOut, getCurrUser };
};
