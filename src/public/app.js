const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const mongodb = new MongoClient("mongodb://localhost:27017");

(async () => {
  try {
    await mongodb.connect();
    app.locals.collection = mongodb.db("tgusers").collection("users");
    app.listen(3000, console.log("Сервер запущен..."));
  } catch (err) {
    console.log(err);
  }
})();
