import { toast } from "react-toastify";
import axiosInstance from "./axios";

const showErrorToast = (message) => {
  toast.error(message);
};

const showSuccessToast = (message) => {
  toast.success(message);
};

const showInfoToast = (message) => {
  toast.info(message);
};

export const getAllQuestions = async () => {
  try {
    const response = await axiosInstance.get(`/questions`);
    return response.data;
  } catch (error) {
    showErrorToast("Щось пішло не так 😕");
    console.error("Error fetching all questions", error);
    throw error;
  }
};

export const getOneQuestion = async (questionId) => {
  try {
    const response = await axiosInstance.get(`/questions/${questionId}`);
    return response.data;
  } catch (error) {
    showErrorToast("Питання не знайдено 🤔");
    console.error("Error fetching question", error);
    throw error;
  }
};

export const askQuestion = async (questionData) => {
  try {
    const response = await axiosInstance.post(`/questions`, questionData);
    showSuccessToast("Питання успішно задано! 😊");
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      showInfoToast("Ця функція доступна лише авторизованим користувачам!");
    }
    if (error.response.status >= 500) {
      showErrorToast("Не вдалося задати питання 😕");
    }

    console.error("Error asking question", error);
    throw error;
  }
};

export const likeQuestion = async (questionId) => {
  try {
    const response = await axiosInstance.post(`questions/like/${questionId}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      showInfoToast("Ця функція доступна лише авторизованим користувачам!");
    }
    console.error("Error liking question", error);
    throw error;
  }
};

export const diselikeQuestion = async (questionId) => {
  try {
    const response = await axiosInstance.post(
      `/questions/ask/diselike/${questionId}`
    );
    showSuccessToast("Питання отримало ваш дизлайк! 👎");
    return response.data;
  } catch (error) {
    showErrorToast("Не вдалося поставити дизлайк на питання 😕");
    console.error("Error disliking question", error);
    throw error;
  }
};

export const answerQuestion = async (questionId, answerData) => {
  try {
    const response = await axiosInstance.post(
      `/questions/answers/${questionId}`,
      answerData
    );
    showSuccessToast("Ви успішно відповіли на питання! 😊");
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      showInfoToast("Ця функція доступна лише авторизованим користувачам!");
    }
    if (error.response.status >= 500) {
      showErrorToast("Не вдалося відповісти на питання 😕");
    }
    console.error("Error answering question", error);
    throw error;
  }
};

export const likeAnswer = async (questionId, answerId) => {
  try {
    const response = await axiosInstance.post(
      `/questions/answers/like/${questionId}/${answerId}`
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      showInfoToast("Ця функція доступна лише авторизованим користувачам!");
    }
    console.error("Error liking answer", error);
    throw error;
  }
};

export const diselikeAnswer = async (questionId, answerId) => {
  try {
    const response = await axiosInstance.post(
      `/answer/diselike/${questionId}/${answerId}`
    );
    showSuccessToast("Ви поставили дизлайк на відповідь! 👎");
    return response.data;
  } catch (error) {
    showErrorToast("Не вдалося поставити дизлайк на відповідь 😕");
    console.error("Error disliking answer", error);
    throw error;
  }
};

export const updateQuestion = async (questionId, questionData) => {
  console.log({ questionId, questionData });
  try {
    const response = await axiosInstance.put(
      `/questions/answer/${questionId}`,
      questionData
    );
    showSuccessToast("Питання успішно оновлено! ✨");
    return response.data;
  } catch (error) {
    showErrorToast("Не вдалося оновити питання 😕");
    console.error("Error updating question", error);
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await axiosInstance.delete(
      `/questions/answer/${questionId}`
    );
    showSuccessToast("Питання успішно видалено! 🗑️");
    return response.data;
  } catch (error) {
    showErrorToast("Не вдалося видалити питання 😕");
    console.error("Error deleting question", error);
    throw error;
  }
};

export const updateAnswer = async (questionId, answerId, answerData) => {
  try {
    const response = await axiosInstance.put(
      `/questions/ask/${questionId}/${answerId}`,
      answerData
    );
    showSuccessToast("Відповідь успішно оновлено! ✨");
    return response.data;
  } catch (error) {
    showErrorToast("Не вдалося оновити відповідь 😕");
    console.error("Error updating answer", error);
    throw error;
  }
};

export const deleteAnswer = async (questionId, answerId) => {
  console.log({ questionId, answerId });
  try {
    const response = await axiosInstance.delete(
      `/questions/ask/${questionId}/${answerId}`
    );
    showSuccessToast("Відповідь успішно видалено! 🗑️");
    return response.data;
  } catch (error) {
    showErrorToast("Не вдалося видалити відповідь 😕");
    console.error("Error deleting answer", error);
    throw error;
  }
};
