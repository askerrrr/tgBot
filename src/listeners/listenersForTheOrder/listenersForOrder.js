const { listenerForSingleOrder } = require("./singleOrder");
const { listenerForMultipleOrder } = require("./multipleOrder");

async function listenersForOrder(bot) {
  listenerForSingleOrder(bot);
  listenerForMultipleOrder(bot);


}
module.exports = { listenersForOrder };
