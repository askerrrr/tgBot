module.exports.getPhone = async (ctx, conversation) => {
  try {
    await ctx.reply("А теперь напишите номер вашего телефона");

    let userPhoneNumber = await conversation.wait();

    return userPhoneNumber.msg.text;
  } catch (err) {
    console.log(err);
  }
};
