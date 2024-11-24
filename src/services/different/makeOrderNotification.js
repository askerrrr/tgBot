module.exports.makeOrderNotification = (order) => {
  if (order.type) {
    return `Новый заказ\n\nID пользователя : ${order.userId}\nНомер телефона : ${order.phone}\nСсылка на товар : ${order.file.path}\nОписание :\nКоличество : ${order.description.quantity}\nРазмер : ${order.description.size}\nID заказа : ${order.id}\n Время заказа : ${order.date}`;
  }

  return `Новый заказ\n\nID пользователя: ${order.userId}\nНомер телефона : ${
    order.phone
  }\nСсылка на таблицу : ${
    order.file.path
  }\nСсылка на файл : ${""}\nВремя заказа : ${order.date}\nID заказа : ${
    order.id
  }`;
};
