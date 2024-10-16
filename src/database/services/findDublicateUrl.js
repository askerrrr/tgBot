async function findDublicateUrl(collection, orderContent) {
  return await collection.findOne({
    userId: orderContent.userId,
    "orders.orderContent.file.url": orderContent.file.url,
  });
}

module.exports = { findDublicateUrl };
