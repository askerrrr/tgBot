function statusTranslate(status) {
  let translatedStatus;
  switch (status) {
    case "0":
      translatedStatus = "взят в обработку";
      break;
    case `1`:
      translatedStatus = `товар выкуплен`;
      break;
    case "2":
      translatedStatus = "товар поступил на склад в китае";
      break;
    case `3`:
      translatedStatus = `в пути`;
      break;
    case `4`:
      translatedStatus = `ожидает получения`;
      break;
    case "5":
      translatedStatus = "заказ завершен";
      break;
    default:
      translatedStatus = "Не взят в обработку";
  }
  console.log("translated", translatedStatus);
  return translatedStatus;
}

module.exports = { statusTranslate };
