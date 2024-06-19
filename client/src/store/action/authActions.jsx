/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import { auth, googleProvider, signInWithPopup } from "../../config/firebase";
import useNotification from "../../hook/useNotification"; // Import hook vào đây

const { notifySuccess, notifyError } = useNotification();

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      const { token, email, role } = response.data;
      localStorage.setItem("token", token);
      notifySuccess("Login successful");
      return { token, email, role };
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        // Lỗi timeout
        notifyError("Login failed: request timeout");
        return rejectWithValue("Request timeout");
      }
      notifyError(error.response?.data?.message || "Login failed"); // Gọi notifyError từ hook
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const email = result.user.email;
      const photoURL = result.user.photoURL || ""; // Get the photo URL from Firebase
      const role = "student"; // Assign a default role or fetch from your server if necessary
      localStorage.setItem("token", token);
      notifySuccess("Google sign-in successful"); // Gọi notifySuccess từ hook
      return { token, email, role, photoURL };
    } catch (error) {
      notifyError(error.message || "Google sign-in failed"); // Gọi notifyError từ hook
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/register", credentials);
      notifySuccess("Registration successful"); // Gọi notifySuccess từ hook
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notifyError("Email already exists"); // Gọi notifyError từ hook
        return rejectWithValue({ message: "Email already exists" });
      }
      if (error.code === "ECONNABORTED") {
        // Lỗi timeout
        notifyError("Registration failed: request timeout");
        return rejectWithValue("Request timeout");
      }
      notifyError(error.response?.data?.message || "Registration failed"); // Gọi notifyError từ hook
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
      notifySuccess("Logout successful"); // Gọi notifySuccess từ hook
      return {};
    } catch (error) {
      notifyError(error.response?.data?.message || "Logout failed"); // Gọi notifyError từ hook
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetRegisterSuccess = () => (dispatch) => {
  dispatch({ type: "auth/resetRegisterSuccess" });
};

export const clearError = () => (dispatch) => {
  dispatch({ type: "auth/clearError" });
};
