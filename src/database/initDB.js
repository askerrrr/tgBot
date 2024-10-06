const { env } = require("../../env");
const MongoClient = require("mongodb").MongoClient;

const mongodb = new MongoClient(env.mongo_url);
const db = mongodb.db("database");
const collection = db.collection("users");

module.exports = { mongodb, collection };
