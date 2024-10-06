async function findDublicateUrl(collection, orderContent) {
  return await collection.findOne({
    tgId: orderContent.tgId,
    "orders.orderContent.file.url": orderContent.file.url,
  });
}

module.exports = { findDublicateUrl };
