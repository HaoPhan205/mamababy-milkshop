/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";

export const login = createAsyncThunk(
  "api/auth/logincustomer",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      const { token, email, role } = response.data;
      localStorage.setItem("token", token);
      toast.success("Đăng nhập thành công");
      return { token, email, role };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Login failed");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/customers", credentials);
      toast.success("Registration successful");
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Email already exists");
      } else {
        toast.error("Registration failed");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      await auth.signOut();
      toast.success("Logout successful");
      return {};
    } catch (error) {
      toast.error("Logout failed");
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearError = () => (dispatch) => {
  dispatch({ type: "auth/clearError" });
};
