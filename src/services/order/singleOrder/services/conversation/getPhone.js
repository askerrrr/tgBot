module.exports.getPhone = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Напишите номер вашего телефона, чтобы мы могли связаться с вами"
    );
    const userPhoneNumber = await conversation.wait();
    return userPhoneNumber.msg.text;
  } catch (err) {
    console.log(err);
  }
};
