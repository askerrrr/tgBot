async function updateOrderContent(collection, orderContent) {
  return await collection.updateOne(
    {
      userId: orderContent.userId,
      "orders.orderContent.file.url": orderContent.file.url,
    },
    {
      $set: { "orders.$.orderContent": orderContent },
    }
  );
}

module.exports = { updateOrderContent };
