const { serviceCost } = require("./serviceCost");
const { delivyreTime } = require("./delivyreTime");
const { shoppingSites } = require("./shoppingSites");
const { deliveryAddress } = require("./deliveryAddress");

async function FAQ(bot) {
  serviceCost(bot);
  delivyreTime(bot);
  shoppingSites(bot);
  deliveryAddress(bot);
}

module.exports = { FAQ };
