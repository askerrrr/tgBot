module.exports.getPhone = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Документ получили, а теперь напишите номер вашего телефона"
    );

    let userPhoneNumber = await conversation.wait();
    userPhoneNumber = userPhoneNumber.msg.text;

    return userPhoneNumber;
  } catch (err) {
    console.log(err);
  }
};
