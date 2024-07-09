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

  const lookUpUserByEmail = async (email) => {
    let lookedUpUser = null;
    await api
      .get(`${customerByEmailEndPoint}?email=${email}`)
      .then((res) => {
        const data = res.data;
        if (data && data.email === email) {
          lookedUpUser = data;
        }
      })
      .catch((err) => console.log(err));

    return lookedUpUser;
  };

  const onSignup = async (customerName, email, password) => {
    const newUser = {
      customerName,
      email,
      password,
    };

    const isExisted = await lookUpUserByEmail(email);

    if (isExisted) {
      message.error("Email này đã tồn tại");
    } else {
      await api
        .post(customersEndPoint, newUser)
        .then((res) => {
          setUser(res.data);
          saveToStorage("user", res.data);
          message.success("Tạo tài khoản thành công");
          navigate("/");
        })
        .catch((err) => {
          message.error("Đã xảy ra lỗi khi tạo tài khoản");
          console.log(err);
        });
    }
  };

  const onLogOut = () => {
    message.success("Đã đăng xuất khỏi tài khoản");
    setUser(null);
    removeFromStorage("user");
    navigate("/");
  };

  const onLogIn = async (email, password) => {
    const lookedUpUser = await lookUpUserByEmail(email);
    if (lookedUpUser) {
      const checkPassword = lookedUpUser.password === password;

      if (checkPassword) {
        setUser(lookedUpUser);
        saveToStorage("user", lookedUpUser);
        message.success("Đăng nhập thành công");
        navigate("/");
      } else {
        message.error("Password không hợp lệ");
      }
    } else {
      message.error("Email không tồn tại");
    }
  };

  const getCurrUser = () => {
    return user;
  };

  const getAllUsers = (setData, setLoading) => {
    setLoading(true);
    api
      .get(customersEndPoint)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return { onSignup, getCurrUser, onLogOut, onLogIn, getAllUsers };
};
