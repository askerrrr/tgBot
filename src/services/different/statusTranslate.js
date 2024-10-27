function statusTranslate(status) {
  switch (status) {
    case "not-accepted-for-processing":
      status = "Не взят в обработку";
      break;
    case "in-processing":
      status = "in-processing";
      break;
    case `purchased`:
      status = `purchased`;
      break;
    case "china-warehouse":
      status = "china-warehouse";
      break;
    case `on-the-way`:
      status = `on-the-way`;
      break;
    case `awaiting-receipt`:
      status = `awaiting-receipt`;
      break;
    case "order-is-completed":
      status = "order-is-completed";
      break;
  }
  return status;
}

module.exports = { statusTranslate };
