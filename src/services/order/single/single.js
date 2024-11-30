var crypto = require("crypto");
var { getUrl } = require("./conversation/getUrl");
var { getImage } = require("./conversation/getImage");
var { getPhone } = require("./conversation/getPhone");
var { getDateAndTime } = require("../services/dateAndTime");
var { textForFailedAttempt } = require("../../../utils/text");
var { getDescriprion } = require("./conversation/getDescriprion");
var { checkOrderStatus } = require("../services/checkOrderStatus");
var { returnOrderToUser } = require("./conversation/returnOrderToUser");

async function single(conversation, ctx) {
  try {
    var userId = `${ctx.chat.id}`;
    var orderTime = getDateAndTime().fullDateTime();
    var randomKey = crypto.randomInt(10, 100000000000) + "0";

    var userName = ctx.chat.user_name || "";
    var firstName = ctx.chat.first_name || "";

    var itemUrl, imageData, description, phone;

    var countForItemUrl = 0;
    var countForImageData = 0;
    var countForDescription = 0;
    var countForPhone = 0;

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

    var [telegramApiFileUrl, imageId] = imageData.split("::");

    var order = {
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

module.exports = { single };
