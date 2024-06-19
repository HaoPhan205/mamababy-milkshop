import axios from "axios";
import { API_URL } from "../constants/index";

const config = {
  baseURL: API_URL,
  // baseURL: "http://localhost:4000", Dùng để test sign-in và sign-up
  timeout: 30000,
};
const api = axios.create(config);
const handleRequest = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};
const handleRequestError = (error) => {
  return Promise.reject(error);
};
const handleResponse = (response) => {
  return response;
};
const handleResponseError = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      window.location.href = "/sign-in";
    }
  }
  return Promise.reject(error);
};
api.interceptors.request.use(handleRequest, handleRequestError);
api.interceptors.response.use(handleResponse, handleResponseError);

export default api;
