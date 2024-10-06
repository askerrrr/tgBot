const { mongodb, collection } = require("./initDB");
const { findDublicateUrl } = require("./findDublicateUrl");
const { updateOrderContent } = require("./updateOrderContent");

async function addNewOrder(ctx, orderContent) {
  try {
    await mongodb.connect();

    const existingDocument = await collection.findOne({
      tgId: orderContent.tgId,
    });

    if (existingDocument) {
      const dublicateUrl = await findDublicateUrl(collection, orderContent);

      if (dublicateUrl) {
        return await updateOrderContent(collection, orderContent);
      } else {
        await collection.updateOne(
          { tgId: orderContent.tgId },
          { $push: { orders: { orderContent } } }
        );
      }
    } else {
      const newUser = {
        tgId: orderContent.tgId,
        firstName: ctx.chat.first_name,
        userName: ctx.chat.user_name === undefined ? "" : ctx.chat.user_name,
        orders: [],
      };

      const result = await collection.insertOne(newUser);
      if (result) {
        return await collection.updateOne(
          { tgId: orderContent.tgId },
          { $push: { orders: { orderContent } } }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addNewOrder };
