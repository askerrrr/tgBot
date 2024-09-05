const { guides } = require("./listenersForGuide/Guides");
const { listenersForApp } = require("./listenersForApp/listenersForApp");
const { listenersForOther } = require("./listenersForOther/listenersForOther");
const {
  listenersOfMainMenu,
} = require("./listenersOfMainMenu/listenersOfMainMenu");
const { getFileId } = require("./differentListeners/listenersForFile");
const { backToMainMenu } = require("./differentListeners/backToMainMenu");
const { backToOtherMenu } = require("./differentListeners/backToOtherMenu");
const { middlewareForConversations } = require("../middleware/middleware");

async function allListeners(bot) {
  await guides(bot);
  await getFileId(bot);
  await backToMainMenu(bot);
  await backToOtherMenu(bot);
  await listenersForApp(bot);
  await listenersForOther(bot);
  await listenersOfMainMenu(bot);
  await middlewareForConversations(bot);
}

module.exports = { allListeners };
