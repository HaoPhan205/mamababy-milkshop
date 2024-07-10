import { useContext } from "react";
import api from "../../config/axios";
import { message } from "antd";
import { Data } from "../../App";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const loginEndpoint = "/api/auth/logincustomer";

export const useUsers = () => {
  const { user, setUser } = useContext(Data);
  const navigate = useNavigate();

  // Function to handle user login
  const onLogIn = async (username, password) => {
    try {
      const response = await api.post(loginEndpoint, { username, password });
      const { token, customerId, customerName } = response.data;

      // Set token to cookie
      Cookies.set("token", token, { expires: 7 }); // Example: set token cookie for 7 days
      console.log("Token set in cookie:", token);

      // Set user context
      setUser({ customerId, customerName });
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

  // Function to handle user logout
  const onLogOut = () => {
    // Remove token cookie and clear user context
    Cookies.remove("token");
    setUser(null);
    message.success("Đã đăng xuất khỏi tài khoản");
    navigate("/");
  };

  // Function to get current user
  const getCurrUser = () => {
    return user ? user.customerName : null;
  };

  return { onLogIn, onLogOut, getCurrUser };
};
