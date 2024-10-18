const crypto = require("crypto");
const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { getDateAndTime } = require("../different/dateAndTime");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function makingAnOrder(conversation, ctx) {
  try {
    const chatId = `${ctx.chat.id}`;
    const userName = ctx.chat.user_name === undefined ? "" : ctx.chat.user_name;
    const firstName =
      ctx.chat.first_name === undefined ? "" : ctx.chat.first_name;

    const orderTime = getDateAndTime().fullTime();
    const randomKey = crypto.randomBytes(10).toString("hex");

    let fileUrl;
    let phone;

    let failedAttempt = 0;

    while (!fileUrl) {
      fileUrl = await getFile(ctx, conversation);

      if (!fileUrl) {
        failedAttempt++;

        if (failedAttempt > 2) {
          await ctx.reply(
            "Вы превысили количество неудачных попыток. Беседа завершена. Что бы начать заново, снова нажмите 'Сделать заказ!'"
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
            "Вы превысили количество неудачных попыток. Беседа завершена. Что бы начать заново, снова нажмите 'Сделать заказ!'"
          );
          return;
        }
      }
    }

    let fileId = fileUrl.split("::")[1];

    const order = {
      phone,
      userId: chatId,
      date: orderTime,
      file: {
        url: fileUrl.split("::")[0],
        id: randomKey,
        pathToFile: `/var/www/userFiles/${chatId}/${randomKey}.xlsx`,
      },
      firstName,
      userName,
      status: "",
    };

    await returnOrderDataToUser(ctx, phone, fileId);
    await checkOrderStatus(ctx, conversation, order, makingAnOrder);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { makingAnOrder }; //экспорт в src\middleware\middleware.js
