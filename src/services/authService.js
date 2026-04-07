import api from "../api/axios";

export const login = async (credentials) => {
  const response = await api.post("/login-admin", credentials);

  const token = response.data.token;

  localStorage.setItem("token", token);

  return response.data;
};
