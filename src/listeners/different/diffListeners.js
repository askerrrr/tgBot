const { backToMainMenu } = require("./backToMainMenu");
const { backToOtherMenu } = require("./backToOtherMenu");

module.exports.diffListeners = async (bot) => {
  backToMainMenu(bot);
  backToOtherMenu(bot);
};
