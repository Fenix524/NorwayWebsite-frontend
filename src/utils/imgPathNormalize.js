import { serverConfig } from "../constants/config";

export const imgPathNormalize = (url) => {
  let newUrl = url;
  try {
    if (!newUrl.startsWith("http")) {
      newUrl = serverConfig.HOST + newUrl;
      return newUrl;
    }
    return newUrl;
  } catch (error) {
    console.log("Помилка перетворення зображення!!!");
  }
};
