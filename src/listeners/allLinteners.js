const { listenerOfMainMenu } = require("./listenerOfMainMenu");
const { listenersForOther } = require("./listenersForOther");
const { listenersForApp } = require("./listenersForApp");
const { listenersForOrder } = require("./listenersForOrder");

async function allListeners(bot) {
  listenerOfMainMenu(bot);
  listenersForOrder(bot);
  listenersForOther(bot);
  listenersForApp(bot);
}

module.exports = { allListeners };
