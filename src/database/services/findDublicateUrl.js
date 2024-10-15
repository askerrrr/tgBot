async function findDublicateUrl(collection, orderContent) {
  return await collection.findOne({
    tgId: orderContent.userId,
    "orders.orderContent.file.url": orderContent.file.url,
  });
}

module.exports = { findDublicateUrl };
