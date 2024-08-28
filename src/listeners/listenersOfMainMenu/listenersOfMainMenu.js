const { FAQ } = require("./FAQ");
const { other } = require("./Other");
const { goToTheOrder } = require("./goToTheOrder");
const { howToPlaceAnOrder } = require("./howToPlaceAnOrder");

async function listenersOfMainMenu(bot) {
  FAQ(bot);
  other(bot);
  goToTheOrder(bot);
  howToPlaceAnOrder(bot);
}

module.exports = { listenersOfMainMenu };
