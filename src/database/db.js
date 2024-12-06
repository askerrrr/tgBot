var { env } = require("../../env");
var MongoClient = require("mongodb").MongoClient;

var mongodb = new MongoClient(env.mongo_url);
var db = mongodb.db("database");
var collection = db.collection("users");

module.exports = { mongodb, collection };
