import axiosInstance from "./axios";
import { toast } from "react-toastify";

export const addPageImg = async (file) => {
  try {
    const data = new FormData();
    data.append("img", file);

    const response = await axiosInstance.post(`/upload/pageImages`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    toast.success("Зображення успішно створено");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Помилка при додаванні зображення 😕");
    console.error("Error adding img", error);
    throw error;
  }
};
export const removePageImg = async (filePath) => {
  try {
    // Конвертувати зворотні слеші у прямі
    const normalizedPath = filePath.replace(/\\/g, "/");
    console.log("Звернення за", normalizedPath);

    const response = await axiosInstance.delete(`/upload/pageImages`, {
      data: { filePath: normalizedPath },
    });

    toast.success("Зображення успішно видалено");
    return response.data;
  } catch (error) {
    // toast.error("Помилка при видаленні зображення 😕");
    console.error("Error deleting img", error);
    throw error;
  }
};
