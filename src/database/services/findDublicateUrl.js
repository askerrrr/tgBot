async function findDublicateUrl(collection, order) {
  return await collection.findOne({
    userId: order.userId,
    "orders.order.file.url": order.file.url,
  });
}

module.exports = { findDublicateUrl };
