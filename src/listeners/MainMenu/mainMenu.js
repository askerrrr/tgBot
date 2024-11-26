const { FAQ } = require("./FAQ");
const { other } = require("./Other");
const { order } = require("./order");
const { howToPlaceAnOrder } = require("./howToPlaceAnOrder");

module.exports.mainMenu = async (bot) => {
  FAQ(bot);
  other(bot);
  order(bot);
  howToPlaceAnOrder(bot);
};

