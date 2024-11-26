const crypto = require("crypto");
const { getUrl } = require("./conversation/getUrl");
const { getImage } = require("./conversation/getImage");
const { getPhone } = require("./conversation/getPhone");
const { getDateAndTime } = require("../services/dateAndTime");
const { textForFailedAttempt } = require("../../../utils/text");
const { getDescriprion } = require("./conversation/getDescriprion");
const { checkOrderStatus } = require("../services/checkOrderStatus");
const { returnOrderToUser } = require("./conversation/returnOrderToUser");

async function single(conversation, ctx) {
  try {
    const userId = `${ctx.chat.id}`;
    const orderTime = getDateAndTime().fullDateTime();
    const randomKey = crypto.randomInt(10, 100000000000) + "0";

    const userName = ctx.chat.user_name || "";
    const firstName = ctx.chat.first_name || "";

    let itemUrl, imageData, description, phone;

    let countForItemUrl = 0;
    let countForImageData = 0;
    let countForDescription = 0;
    let countForPhone = 0;

    while (!itemUrl) {
      itemUrl = await getUrl(ctx, conversation);

      if (!itemUrl) {
        countForItemUrl++;

        if (countForItemUrl > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    while (!imageData) {
      imageData = await getImage(ctx, conversation);

      if (!imageData) {
        countForImageData++;

        if (countForImageData > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    while (!description) {
      description = await getDescriprion(ctx, conversation);

      if (!description) {
        countForDescription++;

        if (countForDescription > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    while (!phone) {
      phone = await getPhone(ctx, conversation);

      if (!phone) {
        countForPhone++;

        if (countForPhone > 2) {
          await ctx.reply(textForFailedAttempt);
          return;
        }
      }
    }

    const [telegramApiFileUrl, imageId] = imageData.split("::");

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
    await checkOrderStatus(ctx, conversation, order, imageId, single);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { single }; //экспорт в "./src/middleware/middleware"
