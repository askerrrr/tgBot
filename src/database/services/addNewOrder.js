const { mongodb, collection } = require("../db");
const { findDublicateUrl } = require("./findDublicateUrl");
const { updateOrder } = require("./updateOrderContent");

async function addNewOrder(order) {
  try {
    await mongodb.connect();

    const existingDocument = await collection.findOne({
      userId: order.userId,
    });

    if (existingDocument) {
      const dublicateUrl = await findDublicateUrl(collection, order);

      if (dublicateUrl) {
        return await updateOrder(collection, order);
      } else {
        await collection.updateOne(
          { userId: order.userId },
          { $push: { orders: { order } } }
        );
      }
    } else if (!existingDocument) {
      const newUser = {
        userId: order.userId,
        firstName: order.firstName,
        userName: order.userName,
        orders: [],
      };

      const result = await collection.insertOne(newUser);
      if (result) {
        return await collection.updateOne(
          { userId: order.userId },
          { $push: { orders: { order } } }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addNewOrder };
