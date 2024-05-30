import axiosInstance from "./axios";
import { toast } from "react-toastify";

const showSuccessToast = (message) => {
  toast.success(message);
};

const showErrorToast = (message) => {
  toast.error(message);
};

// Функції для запитів до ресурсів landmark
export const getAllLandmarks = async () => {
  try {
    const response = await axiosInstance.get(`/landmarks`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при отриманні списку пам'яток 😕");
    console.error("Error fetching all landmarks", error);
    throw error;
  }
};

export const getOneLandmark = async (id) => {
  try {
    const response = await axiosInstance.get(`/landmarks/${id}`);
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при отриманні пам'ятки 😕");
    console.error("Error fetching landmark", error);
    throw error;
  }
};

export const createLandmark = async (landmarkData) => {
  try {
    const response = await axiosInstance.post(`/landmarks`, landmarkData);
    showSuccessToast("Пам'ятку успішно створено! 😊");
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при створенні пам'ятки 😕");
    console.error("Error creating landmark", error);
    throw error;
  }
};

export const updateLandmark = async (id, landmarkData) => {
  try {
    const response = await axiosInstance.put(`/landmarks/${id}`, landmarkData);
    showSuccessToast("Пам'ятку успішно оновлено! 😊");
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при оновленні пам'ятки 😕");
    console.error("Error updating landmark", error);
    throw error;
  }
};

export const deleteLandmark = async (id) => {
  try {
    const response = await axiosInstance.delete(`/landmarks/${id}`);
    showSuccessToast("Пам'ятку успішно видалено! 🗑️");
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при видаленні пам'ятки 😕");
    console.error("Error deleting landmark", error);
    throw error;
  }
};
