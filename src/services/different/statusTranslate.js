function statusTranslate(statusId) {
  let translatedStatus;
  switch (statusId) {
    case "0":
      translatedStatus = "Взят в обработку";
      break;
    case `1`:
      translatedStatus = `Товар выкуплен`;
      break;
    case "2":
      translatedStatus = "Товар поступил на склад в китае";
      break;
    case `3`:
      translatedStatus = `В пути`;
      break;
    case `4`:
      translatedStatus = `Ожидает получения по адресу\nСолдатский переулок  8,  подъезд 2,  этаж 8,  кв 98`;
      break;
    case "5":
      translatedStatus = "Заказ завершен";
      break;
    default:
      translatedStatus = "Не взят в обработку";
  }
  console.log("translated", translatedStatus);
  return translatedStatus;
}

module.exports = { statusTranslate };
