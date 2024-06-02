import { serverConfig } from "../constants/config";

export const imgPathNormalize = (url) => {
  if (!url) {
    console.error("Недійсний URL");
    return "";
  }

  let newUrl = url.replace(/\\/g, "/");

  try {
    if (!newUrl.startsWith("http")) {
      newUrl = serverConfig.HOST + newUrl;
      // console.log({ newUrl });
    }
    return newUrl;
  } catch (error) {
    console.log("Помилка перетворення зображення!!!", error);
    return "";
  }
};
