/** @format */

import { useContext } from "react";
import api from "../../config/axios";
import { message } from "antd";
import { Data } from "../../App";
import { useNavigate } from "react-router-dom";
import { useStorage } from "./useStorage";

// Update the endpoint to the new API endpoint for customers
const endPoint = "/api/customers";

export const useUsers = () => {
  const { setUser, user } = useContext(Data);
  const { saveToStorage, removeFromStorage } = useStorage();
  const navigate = useNavigate();

  const lookUpUserByUserName = async (username) => {
    let lookedUpUser = null;
    await api
      .get(`${endPoint}?username=${username}`)
      .then((res) => {
        const data = res.data;
        if (data.length > 0) {
          if (data[0].username === username) {
            lookedUpUser = data[0];
          }
        }
      })
      .catch((err) => console.log(err));

    return lookedUpUser;
  };

  const onSignup = async (username, email, password) => {
    const defaultRole = 1; // user
    const user = {
      username: username,
      email: email,
      password: password,
      role: defaultRole,
    };

    const isExisted = await lookUpUserByUserName(username);

    if (isExisted) {
      message.error("Username này đã tồn tại");
    } else {
      await api.post(endPoint, user).then((res) => {
        setUser(user);
        saveToStorage("user", user);
        message.success("Tạo tài khoản thành công");
        navigate("/");
      });
    }
  };

  const onLogOut = () => {
    message.success("Đã đăng xuất khỏi tài khoản");
    setUser(null);
    removeFromStorage("user");
    navigate("/");
  };

  const onLogIn = async (username, password) => {
    const lookedUpUser = await lookUpUserByUserName(username);
    if (lookedUpUser) {
      const checkUsername = lookedUpUser.username === username;
      const checkPassword = lookedUpUser.password === password;

      if (checkUsername && checkPassword) {
        setUser(lookedUpUser);
        saveToStorage("user", lookedUpUser);
        message.success("Đăng nhập thành công");
        navigate("/");
      } else {
        message.error("Username hoặc password không hợp lệ");
      }
    } else {
      message.error("Username hoặc password không hợp lệ");
    }
  };

  const getCurrUser = () => {
    return user;
  };

  const getAllUsers = (setData, setLoading) => {
    setLoading(true);
    api
      .get(endPoint)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return { onSignup, getCurrUser, onLogOut, onLogIn, getAllUsers };
};
