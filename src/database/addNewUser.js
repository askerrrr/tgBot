const { mongodb } = require("./initDB");

async function addNewUser(id, user) {
  try {
    await mongodb.connect();
    const db = mongodb.db("database");
    const collection = db.collection("users");
    const existingDocument = await collection.findOne({ tgId: id });

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
