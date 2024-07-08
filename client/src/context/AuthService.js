import api from "../config/axios";

const loginAdmin = async (username, password) => {
  const response = await api.post("/api/auth/login", {
    username,
    password,
  });
  return response.data;
};

const loginCustomer = async (email, password) => {
  const response = await api.post("/api/customers", {
    email,
    password,
  });
  return response.data;
};

const registerCustomer = async (email, password, name) => {
  const response = await api.post("/api/customers", {
    email,
    password,
    name,
  });
  return response.data;
};

export { loginAdmin, loginCustomer, registerCustomer };
