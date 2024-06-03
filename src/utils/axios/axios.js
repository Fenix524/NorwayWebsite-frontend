import axios from "axios";
import { serverConfig } from "../../constants/config";

const axiosInstance = axios.create({
  baseURL: serverConfig.HOST,
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
