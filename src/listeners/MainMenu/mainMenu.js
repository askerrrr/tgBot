const { other } = require("./Other");
const { howToPlaceAnOrder } = require("./howToPlaceAnOrder");

async function mainMenu(bot) {
  other(bot);
  howToPlaceAnOrder(bot);
}

module.exports = { mainMenu };
