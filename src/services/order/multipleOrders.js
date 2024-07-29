async function multipleOrders(conversation, ctx) {
  await ctx.reply("Пришлите документ с вашими заказами");
  const { orderDocument } = await conversation.wait();
  await ctx.reply("Скоро начнем обрабатывать ваши заказы!");
}

module.exports = { multipleOrders };
