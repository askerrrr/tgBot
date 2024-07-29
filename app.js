const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const app = express();
<<<<<<< HEAD
const order = require("./router/order");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
=======
const user = require("./router/userOrder");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/telegramuser/user", user);
>>>>>>> detachhead

const mongodb = new MongoClient("mongodb://localhost:27017");

(async () => {
  try {
    await mongodb.connect();
    app.locals.collection = mongodb.db("grammyUsers").collection("users");
    app.listen(3000, console.log("Сервер запущен..."));
  } catch (err) {
    console.log(err);
  }
})();

app.get("/telegramuser", async (req, res) => {
  const collection = req.app.locals.collection;
  const user = await collection.find({}).toArray();
  if (user) {
    return res.send(user);
  } else {
    res.sendStatus(404);
  }
});

app.use("/order", order);
