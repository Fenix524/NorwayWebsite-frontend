import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3003/",
});

// Utility to add JWT
export const setAuthHeader = (token) => {
  const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

  axiosInstance.defaults.headers.common.Authorization = authToken;
  localStorage.setItem("token", authToken);
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = "";
  localStorage.removeItem("token");
};

export default axiosInstance;
