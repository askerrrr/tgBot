const { mongodb, collection } = require("../db");

module.exports.addNewOrder = async (order) => {
  try {
    await mongodb.connect();

    const existingDocument = await collection.findOne({
      userId: order.userId,
    });

    if (!existingDocument) {
      const newUser = {
        userId: order.userId,
        firstName: order.firstName,
        userName: order.userName,
        orders: [],
      };

      const result = await collection.insertOne(newUser);

      if (!result) console.log("Ошибка при добавлении нового пользователя");

      return await collection.updateOne(
        { userId: order.userId },
        { $push: { orders: { order } } }
      );
    }

    await collection.updateOne(
      { userId: order.userId },
      { $push: { orders: { order } } }
    );
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await mongodb.close();
  }
};
