import axiosInstance from "./axios";
import { toast } from "react-toastify";

const showSuccessToast = (message) => {
  toast.success(message);
};

const showErrorToast = (message) => {
  toast.error(message);
};

// Функції для запитів до ресурсів міст
export const getAllCities = async () => {
  try {
    const response = await axiosInstance.get(`/cities`);
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при отриманні списку міст 😕");
    console.error("Error fetching all cities", error);
    throw error;
  }
};

export const getOneCity = async (id) => {
  try {
    const response = await axiosInstance.get(`/cities/${id}`);
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при отриманні міста 😕");
    console.error("Error fetching city", error);
    throw error;
  }
};

export const createCity = async (cityData) => {
  try {
    const response = await axiosInstance.post(`/cities`, cityData);
    showSuccessToast("Місто успішно створено! 😊");
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при створенні міста 😕");
    console.error("Error creating city", error);
    throw error;
  }
};

export const updateCity = async (id, cityData) => {
  try {
    const response = await axiosInstance.put(`/cities/${id}`, cityData);
    showSuccessToast("Місто успішно оновлено! 😊");
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при оновленні міста 😕");
    console.error("Error updating city", error);
    throw error;
  }
};

export const deleteCity = async (id) => {
  try {
    const response = await axiosInstance.delete(`/cities/${id}`);
    showSuccessToast("Місто успішно видалено! 🗑️");
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при видаленні міста 😕");
    console.error("Error deleting city", error);
    throw error;
  }
};
