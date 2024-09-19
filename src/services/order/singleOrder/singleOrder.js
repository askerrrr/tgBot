const {
  sendOrderMessageToAdmin,
} = require("./services/sendOrderMessageToAdmin");
const {
  returnOrderDataToUserForVerification,
} = require("./services/returnOrderDataToUser");

const { sendOrderInfoToServer } = require("./services/sendOrderInfoToServer");

const { getUrl } = require("./services/conversation/getUrl");
const { getImage } = require("./services/conversation/getImage");
const { getPhone } = require("./services/conversation/getPhone");
const { getDescriprion } = require("./services/conversation/getDescriprion");

async function singleOrder(conversation, ctx) {
  const chatId = ctx.chat.id;

  const url = await getUrl(ctx, conversation);

  const quantityAndSize = await getDescriprion(ctx, conversation);

  const image = await getImage(ctx, conversation);

  const userPhoneNumber = await getPhone(ctx, conversation);

  const orderContent = {
    url,
    ctx,
    chatId,
    image,
    quantityAndSize,
    userPhoneNumber,
  };

  await returnOrderDataToUserForVerification(ctx, orderContent);

  const orderStartus = await conversation.wait();

  if (orderStartus.msg.text == "Да, все правильно!") {
    await ctx.reply("Спасибо, скоро начнем обрабатывать заказ", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  } else if (
    orderStartus.msg.text == "Нет, тут ошибка, я хочу исправить данные"
  ) {
    await ctx.reply("Давайте исправим", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    return await singleOrder(conversation, ctx);
  }

  await sendOrderMessageToAdmin(orderContent);
  await sendOrderInfoToServer(orderContent);
}

module.exports = { singleOrder }; //экспорт в "./src/middleware/middleware"
