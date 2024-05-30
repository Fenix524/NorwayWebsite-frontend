import { toast } from "react-toastify";
import axiosInstance from "./axios";
import { imgPathNormalize } from "../imgPathNormalize";

export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userData);
    console.log("User registered:", response);
    toast.success("Користувач успішно зареєстрований! 🎉");
    return response;
  } catch (error) {
    if (error.response.status === 409) {
      toast.error("Користувач з такою поштою вже існує 😮🫤");
    } else if (error.response.status >= 500) {
      toast.error("Помилка реєстрації 🤒🤕");
    } else {
      console.error("Error during signup:", error.message);
    }
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    console.log("User logged in:", response);
    toast.success("Успішний вхід у систему! 🎉");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Неправильні дані для входу, спробуйте ще раз! 🤒🤕");
    } else if (error.response.status >= 500) {
      toast.error("Помилка авторизації 🤒🤕");
    } else {
      console.error("Login failed:", error.message);
    }
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    toast.success("Успішний вихід з системи! 🎉");
    return response;
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    console.log("User profile:", response);
    return response;
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    console.log("All users:", response);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, updatedData);
    console.log("User updated:", response);
    toast.success("Користувач успішно оновлено! 🎉");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Користувач не знайдений! 😕");
    } else if (error.response.status >= 500) {
      toast.error("Помилка оновлення користувача 🤒🤕");
    }
    console.error("Error updating user:", error.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    console.log("User deleted:", response);
    toast.success("Користувач успішно видалено! 🎉");
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Користувач не знайдений! 😕");
    } else if (error.response.status >= 500) {
      toast.error("Помилка видалення користувача 🤒🤕");
    }
    console.error("Error deleting user:", error.message);
  }
};
