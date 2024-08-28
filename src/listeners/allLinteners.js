const { listenersForApp } = require("./listenersForApp");
const { listenersForOther } = require("./listenersForOther/listenersForOther");
const {
  listenersForOrder,
} = require("./listenersForTheOrder/listenersForOrder");
const {
  listenersOfMainMenu,
} = require("./listenersOfMainMenu/listenersOfMainMenu");
const { getFileId } = require("../listeners/listenersForFile");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  listenersForApp(bot);
  listenersForOrder(bot);
  listenersForOther(bot);
  listenersOfMainMenu(bot);
  middlewareForConversations(bot);
}

module.exports = { allListeners };
