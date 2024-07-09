import { useContext } from "react";
import api from "../../config/axios";
import { message } from "antd";
import { Data } from "../../App";
import { useNavigate } from "react-router-dom";
import { useStorage } from "./useStorage";

const customersEndPoint = "/api/customers";
const customerByEmailEndPoint = "/api/customers/byemail";

export const useUsers = () => {
  const { setUser, user } = useContext(Data);
  const { saveToStorage, removeFromStorage } = useStorage();
  const navigate = useNavigate();

  // Function to lookup a user by email
  const lookUpUserByEmail = async (email) => {
    let lookedUpUser = null;
    await api
      .get(`${customerByEmailEndPoint}?email=${email}`)
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          if (data[0].email === email) {
            lookedUpUser = data[0];
          }
        }
      })
      .catch((err) => console.log(err));

    return lookedUpUser;
  };

  // Function to handle user signup
  const onSignup = async (customerName, email, password) => {
    const isExisted = await lookUpUserByEmail(email);

    if (isExisted) {
      message.error("Email này đã tồn tại");
    } else {
      // Create a new user if email does not exist
      const newUser = { customerName, email, password };
      const response = await api.post(customersEndPoint, newUser);
      const createdUser = response.data;
      setUser(createdUser);
      saveToStorage("user", createdUser);
      message.success("Tạo tài khoản thành công");
      navigate("/");
    }
  };

  // Function to handle user logout
  const onLogOut = () => {
    setUser(null);
    removeFromStorage("user");
    message.success("Đã đăng xuất khỏi tài khoản");
    navigate("/");
  };

  // Function to handle user login
  const onLogIn = async (email, password) => {
    const lookedUpUser = await lookUpUserByEmail(email);
    if (lookedUpUser) {
      const checkEmail = lookedUpUser.email === email;
      const checkPassword = lookedUpUser.password === password;

      if (checkEmail && checkPassword) {
        setUser(lookedUpUser);
        saveToStorage("user", lookedUpUser);
        message.success("Đăng nhập thành công");
        navigate("/");
      } else {
        message.error("Password không hợp lệ");
      }
    } else {
      message.error("Username hoặc password không hợp lệ");
    }
  };

  // Function to get current user
  const getCurrUser = () => {
    return user;
  };

  // Function to get all users (not typically used in frontend, consider security implications)
  const getAllUsers = (setData, setLoading) => {
    setLoading(true);
    api
      .get(customersEndPoint)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Error fetching users:", err);
        message.error("Error fetching user data");
      })
      .finally(() => setLoading(false));
  };

  return { onSignup, getCurrUser, onLogOut, onLogIn, getAllUsers };
};
