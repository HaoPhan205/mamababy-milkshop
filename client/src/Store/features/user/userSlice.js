import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../../config/axios";
import { message } from "antd";

const initialState = {
  user: null,
  token: Cookies.get("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("token", state.token, { expires: 7 });
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const logIn = (username, password) => async (dispatch) => {
  try {
    const response = await api.post("/api/auth/logincustomer", {
      username,
      password,
    });
    const { token, customerName, customerId } = response.data;

    dispatch(setUser({ user: { customerId, customerName }, token }));
    message.success("Đăng nhập thành công");
  } catch (error) {
    console.error("Login error:", error);
    message.error(
      "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập."
    );
  }
};

export const logOut = () => (dispatch) => {
  dispatch(clearUser());
  message.success("Đã đăng xuất khỏi tài khoản");
};

export default userSlice.reducer;
