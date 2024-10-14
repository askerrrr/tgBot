const { FAQ } = require("./FAQ");
const { other } = require("./Other");
const { howToPlaceAnOrder } = require("./howToPlaceAnOrder");

async function mainMenu(bot) {
  FAQ(bot);
  other(bot);
  howToPlaceAnOrder(bot);
}

module.exports = { mainMenu };
