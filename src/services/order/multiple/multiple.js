const crypto = require("crypto");
const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { getDateAndTime } = require("../../different/dateAndTime");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function multiple(conversation, ctx) {
  try {
    const userId = `${ctx.chat.id}`;
    const userName = ctx.chat.user_name === undefined ? "" : ctx.chat.user_name;
    const firstName =
      ctx.chat.first_name === undefined ? "" : ctx.chat.first_name;

    const orderTime = getDateAndTime().fullDateTime();
    const randomKey = crypto.randomInt(10, 100000000000) + "0";

    let fileUrl;
    let phone;

    let failedAttempt = 0;

    while (!fileUrl) {
      fileUrl = await getFile(ctx, conversation);

      if (!fileUrl) {
        failedAttempt++;

        if (failedAttempt > 2) {
          await ctx.reply(
            "Вы превысили количество неудачных попыток. Оформление заказа завершено. Что бы начать заново, снова нажмите 'Сделать заказ!'"
          );
          failedAttempt = 0;
          return;
        }
      }
    }

    while (!phone) {
      phone = await getPhone(ctx, conversation);

      if (!phone) {
        failedAttempt++;

        if (failedAttempt > 4) {
          await ctx.reply(
            "Вы превысили количество неудачных попыток. Оформление заказа завершено. Что бы начать заново, снова нажмите 'Сделать заказ!'"
          );
          return;
        }
      }
    }

    let fileId = fileUrl.split("::")[1];

    const order = {
      userId,
      firstName,
      userName,
      phone,
      file: {
        url: fileUrl.split("::")[0],
        id: randomKey,
        pathToFile: `/var/www/userFiles/${userId}/docs/${randomKey}.xlsx`,
        status: "not-accepted-for-processing:0",
      },
      date: orderTime,
    };

    await returnOrderDataToUser(ctx, phone, fileId);
    await checkOrderStatus(ctx, conversation, order, multiple);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { multiple }; //экспорт в src\middleware\middleware.js
