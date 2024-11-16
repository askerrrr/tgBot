const crypto = require("crypto");
const { getUrl } = require("./conversation/getUrl");
const { getImage } = require("./conversation/getImage");
const { getPhone } = require("./conversation/getPhone");
const { getDateAndTime } = require("../../different/dateAndTime");
const { getDescriprion } = require("./conversation/getDescriprion");
const { returnOrderToUser } = require("./services/returnOrderToUser");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");

async function single(conversation, ctx) {
  try {
    const userId = `${ctx.chat.id}`;
    const orderTime = getDateAndTime().fullDateTime();
    const randomKey = crypto.randomInt(10, 100000000000) + "0";

    const userName = ctx.chat.user_name === undefined ? "" : ctx.chat.user_name;
    const firstName =
      ctx.chat.first_name === undefined ? "" : ctx.chat.first_name;

    let itemUrl, image, description, phone;

    let countForImage = 0;
    let countForPhone = 0;

    itemUrl = await getUrl(ctx, conversation);

    while (!image) {
      image = await getImage(ctx, conversation);

      if (!image) {
        countForImage++;
        console.log("countForImage", countForImage);
        if (countForImage > 2) {
          await ctx.reply(
            "Вы превысили количество неудачных попыток. Оформление заказа завершено. Что бы начать заново, снова нажмите 'Сделать заказ!'"
          );
          return;
        }
      }
    }

    description = await getDescriprion(ctx, conversation);

    while (!phone) {
      phone = await getPhone(ctx, conversation);

      if (!phone) {
        countForPhone++;
        console.log("countForPhone", countForPhone);
        if (countForPhone > 2) {
          await ctx.reply(
            "Вы превысили количество неудачных попыток. Оформление заказа завершено. Что бы начать заново, снова нажмите 'Сделать заказ!'"
          );
          return;
        }
      }
    }

    const [telegramApiFileUrl, imageId] = image.split("::");

    const order = {
      id: randomKey,
      userId,
      firstName,
      userName,
      phone,
      itemUrl,
      date: orderTime,
      type: "single",
      description,
      orderStatus: "not-accepted-for-processing:0",
      type: "single",
      file: {
        path: `/var/www/userFiles/${userId}/images/${randomKey}.jpg`,
        telegramApiFileUrl,
      },
    };

    await returnOrderToUser(ctx, itemUrl, phone, imageId, description);
    await checkOrderStatus(ctx, conversation, single, order, imageId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { single }; //экспорт в "./src/middleware/middleware"
