const { getUrl } = require("./conversation/getUrl");
const { getImage } = require("./conversation/getImage");
const { getPhone } = require("./conversation/getPhone");
const { getDescriprion } = require("./conversation/getDescriprion");
const { checkOrderStatus } = require("./conversation/checkOrderStatus");
const { returnOrderDataToUser } = require("./services/returnOrderDataToUser");

async function single(conversation, ctx) {
  try {
    const userId = `${ctx.chat.id}`;

    const url = await getUrl(ctx, conversation);

    const description = await getDescriprion(ctx, conversation);

    const image = await getImage(ctx, conversation);

    if (!image) return;

    const userPhoneNumber = await getPhone(ctx, conversation);

    const order = {
      url,
      ctx,
      userId,
      image,
      description,
      userPhoneNumber,
    };

    await returnOrderDataToUser(ctx, order);
    await checkOrderStatus(ctx, conversation, singleOrder, order);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { single }; //экспорт в "./src/middleware/middleware"
