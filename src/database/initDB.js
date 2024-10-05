const { env } = require("../../env");
const MongoClient = require("mongodb").MongoClient;

const mongodb = new MongoClient(env.mongo_url);

module.exports = { mongodb };
