async function updateOrder(collection, order) {
  return await collection.updateOne(
    {
      userId: order.userId,
      "orders.order.file.url": order.file.url,
    },
    {
      $set: { "orders.$.order": order },
    }
  );
}

module.exports = { updateOrder };
