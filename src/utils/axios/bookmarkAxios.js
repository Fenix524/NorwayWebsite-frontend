import { toast } from "react-toastify";
import axiosInstance from "./axios";

const showSuccessToast = (message) => {
  toast.success(message);
};

const showErrorToast = (message) => {
  toast.error(message);
};

const showInfoToast = (message) => {
  toast.info(message);
};

// Функції для запитів до ресурсів закладок
export const getAllBookmarks = async () => {
  try {
    const response = await axiosInstance.get(`/bookmarks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all bookmarks", error);
    throw error;
  }
};

export const getOneBookmark = async () => {
  try {
    const response = await axiosInstance.get(`/bookmarks/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookmark", error);
    throw error;
  }
};

export const togleBookmarks = async (pageId) => {
  try {
    const response = await axiosInstance.put(`/bookmarks/${pageId}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      showInfoToast("Ця функція доступна лише авторизованим користувачам!");
    }
    console.error("Error adding to bookmarks", error);
    throw error;
  }
};
export const addToBookmarks = async (pageId) => {
  try {
    const response = await axiosInstance.post(`/bookmarks`, { pageId });
    showSuccessToast("Закладку успішно додано! 😊");
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при додаванні до закладок 😕");
    console.error("Error adding to bookmarks", error);
    throw error;
  }
};

export const removeFromBookmarks = async (id) => {
  try {
    const response = await axiosInstance.delete(`/bookmarks/${id}`);
    showSuccessToast("Закладку успішно видалено! 🗑️");
    return response.data;
  } catch (error) {
    showErrorToast("Помилка при видаленні з закладок 😕");
    console.error("Error removing from bookmarks", error);
    throw error;
  }
};
