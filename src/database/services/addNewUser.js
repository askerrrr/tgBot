const { mongodb, collection } = require("../db");

async function addNewUser(user) {
  try {
    await mongodb.connect();

    const existingDocument = await collection.findOne({ userId: user.userId });

    if (!existingDocument) {
      await collection.insertOne(user);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addNewUser };
