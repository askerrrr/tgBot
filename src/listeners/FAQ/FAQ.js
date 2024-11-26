const { shoppingSites } = require("./shoppingSites");
const { delivery } = require("./delivery/delivery");

module.exports.FAQ = async (bot) => {
  delivery(bot);
  shoppingSites(bot);
};
