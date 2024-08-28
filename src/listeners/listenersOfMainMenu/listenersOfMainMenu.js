const { FAQ } = require("./FAQ");
const { other } = require("./Other");
const { goToTheOrder } = require("./goToTheOrder");
const { costCalculation } = require("./costCalculation");
const { howToPlaceAnOrder } = require("./howToPlaceAnOrder");

async function listenersOfMainMenu(bot) {
  FAQ(bot);
  other(bot);
  goToTheOrder(bot);
  costCalculation(bot);
  howToPlaceAnOrder(bot);
}

module.exports = { listenersOfMainMenu };
