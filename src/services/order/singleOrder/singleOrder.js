const { getUrl } = require("./services/conversation/getUrl");
const { getImage } = require("./services/conversation/getImage");
const { getPhone } = require("./services/conversation/getPhone");
const {
  checkOrderStatus,
} = require("./services/conversation/checkOrderStatus");
const { getDescriprion } = require("./services/conversation/getDescriprion");
const { sendOrderInfoToServer } = require("./services/sendOrderInfoToServer");
const {
  sendOrderMessageToAdmin,
} = require("./services/sendOrderMessageToAdmin");
const {
  returnOrderDataToUserForVerification,
} = require("./services/returnOrderDataToUser");

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
  await checkOrderStatus(ctx, conversation, singleOrder);

  await sendOrderMessageToAdmin(orderContent);
  await sendOrderInfoToServer(orderContent);
}

module.exports = { singleOrder }; //экспорт в "./src/middleware/middleware"
