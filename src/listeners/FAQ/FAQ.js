const { shoppingSites } = require("./shoppingSites");
const { delivery } = require("./delivery/delivery");

async function FAQ(bot) {
  delivery(bot);
  shoppingSites(bot);
}

module.exports = { FAQ };
