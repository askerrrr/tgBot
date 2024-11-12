module.exports.makeOrderNotification = (order) => {
  if (order.type) {
    return `Новый заказ\n\nID пользователя : ${order.userId}\nНомер телефона : ${order.phone}\nСсылка на товар : ${order.file.url}\nОписание :\nКоличество : ${order.file.description.quantity}\nРазмер : ${order.file.description.size}\nID заказа : ${order.file.id}\n Время заказа : ${order.date}`;
  }

  return `Новый заказ\n\nID пользователя: ${order.userId}\nНомер телефона : ${ order.phone}\nСсылка на таблицу : ${ order.file.url}\nСсылка на файл : ${""}\nВремя заказа : ${order.date}\nID заказа : ${ order.file.id}`;
};
