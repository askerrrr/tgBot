const { backToMainMenu } = require("./backToMainMenu");
const { backToOtherMenu } = require("./backToOtherMenu");

async function diffListeners(bot) {
  backToMainMenu(bot);
  backToOtherMenu(bot);
}

module.exports = { diffListeners };
