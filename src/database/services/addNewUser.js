var { mongodb, collection } = require("../db");

module.exports.addNewUser = async (user) => {
  try {
    await mongodb.connect();

    var existingDocument = await collection.findOne({ userId: user.userId });

    if (!existingDocument) return await collection.insertOne(user);

    return null;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await mongodb.close();
  }
};
