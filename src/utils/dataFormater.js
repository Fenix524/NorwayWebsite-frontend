export function likeStatusCalculate(likeArr, userId) {
  console.log("============++++++++++++++++++==========", likeArr, userId);
  return likeArr.includes(userId);
}

export function formatDate(isoDateStr) {
  // Створюємо об'єкт Date з рядка ISO
  const date = new Date(isoDateStr);

  // Опції форматування дати
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  // Форматуємо дату за допомогою Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("uk-UA", options).format(date);

  return formattedDate;
}
