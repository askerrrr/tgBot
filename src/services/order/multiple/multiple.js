const crypto = require("crypto");
const { getFile } = require("./conversation/getFile");
const { getPhone } = require("./conversation/getPhone");
const { textForFailedAttempt } = require("../../../utils/text");
const { getDateAndTime } = require("../../different/dateAndTime");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function multiple(conversation, ctx) {
  try {
    const userId = `${ctx.chat.id}`;

    const userName = ctx.chat.user_name || "";
    const firstName = ctx.chat.first_name || "";

    const orderTime = getDateAndTime().fullDateTime();
    const randomKey = crypto.randomInt(10, 100000000000) + "0";

    let fileData, phone;

    let failedAttempt = 0;

    while (!fileData) {
      fileData = await getFile(ctx, conversation);

      if (!fileData) {
        failedAttempt++;

        if (failedAttempt > 2) {
          await ctx.reply(textForFailedAttempt);
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
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    const [telegramApiFileUrl, fileId] = fileData.split("::");

    const order = {
      id: randomKey,
      userId,
      firstName,
      userName,
      phone,
      date: orderTime,
      orderStatus: "not-accepted-for-processing:0",
      file: {
        path: `/var/www/userFiles/${userId}/docs/${randomKey}.xlsx`,
        telegramApiFileUrl,
      },
    };

    await returnOrderDataToUser(ctx, phone, fileId);
    await checkOrderStatus(ctx, conversation, order, multiple);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { multiple }; //экспорт в src\middleware\middleware.js
