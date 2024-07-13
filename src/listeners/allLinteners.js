const { listenerOfMainMenu } = require("./listenerOfMainMenu");
const { listenersForOther } = require("./listenersForOther");
const { listenersForApp } = require("./listenersForApp");
const { listenersForOrder } = require("./listenersForOrder");
const { middlewareForApp } = require("../middleware/middlewareForApp");

function allListeners(bot) {
  listenerOfMainMenu(bot);
  listenersForOrder(bot);
  listenersForOther(bot);
  listenersForApp(bot);
  middlewareForApp(bot);
}

module.exports = { allListeners };
