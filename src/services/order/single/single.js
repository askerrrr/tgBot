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

    let url, image, description, phone;

    let countForUrl = 0;
    let countForImage = 0;
    let countForPhone = 0;

    while (!url) {
      url = await getUrl(ctx, conversation);

      if (!url) {
        countForUrl++;

        if (countForUrl > 2) {
          await ctx.reply(
            "Вы превысили количество неудачных попыток. Беседа завершена. Что бы начать заново, снова нажмите 'Сделать заказ!'"
          );
          return;
        }
      }
    }

    while (!image) {
      image = await getImage(ctx, conversation);

      if (!image) {
        countForImage++;

        if (countForImage > 2) {
          await ctx.reply(
            "Вы превысили количество неудачных попыток. Беседа завершена. Что бы начать заново, снова нажмите 'Сделать заказ!'"
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

        if (countForPhone > 2) {
          await ctx.reply(
            "Вы превысили количество неудачных попыток. Беседа завершена. Что бы начать заново, снова нажмите 'Сделать заказ!'"
          );
          return;
        }
      }
    }

    let imageId = image.split("::")[1];

    const order = {
      phone,
      userId,
      firstName,
      userName,
      date: orderTime,
      file: {
        url: image.split("::")[0],
        id: randomKey,
        pathToFile: `/var/www/userFiles/${userId}/images/${randomKey}.jpg`,
        status: "not-accepted-for-processing:0",
      },

      description,
    };

    await returnOrderToUser(ctx, url, phone, imageId, description);
    await checkOrderStatus(ctx, conversation, single, order, imageId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { single }; //экспорт в "./src/middleware/middleware"
