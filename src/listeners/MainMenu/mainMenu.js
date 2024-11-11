const { FAQ } = require("./FAQ");
const { other } = require("./Other");
const { order } = require("./order");
const { howToPlaceAnOrder } = require("./howToPlaceAnOrder");

async function mainMenu(bot) {
  FAQ(bot);
  other(bot);
  order(bot);
  howToPlaceAnOrder(bot);
}

module.exports = { mainMenu };
