const { textForOneOrder } = require("../../utils/text");

async function singleOrderHandler(conversation, ctx) {
  await ctx.reply(textForOneOrder);
  const { message } = await conversation.wait();
  console.log(message.text);
  if (message) {
    return await ctx.reply("Спасибо, скоро начнем обрабатавать заказ!");
  }
}

module.exports = { singleOrderHandler };

// async function greeting(conversation, ctx) {
//     await ctx.reply("Hi there! What is your name?");
//     const { message } = await conversation.wait();
//     await ctx.reply(`Welcome to the chat, ${message.text}!`);
//   }
