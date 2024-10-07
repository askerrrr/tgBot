const { mongodb, collection } = require("../db");
const { findDublicateUrl } = require("./findDublicateUrl");
const { updateOrderContent } = require("./updateOrderContent");

async function addNewOrder(orderContent) {
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
    } else if (!existingDocument) {
      const newUser = {
        tgId: orderContent.tgId,
        firstName: orderContent.firstName,
        userName: orderContent.userName,
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
