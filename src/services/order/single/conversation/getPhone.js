const { checkPhoneNumber } = require("../../services/checkPhoneNumber");

module.exports.getPhone = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Напишите номер вашего телефона без пробелов, скобок и дефисов"
    );

    const message = await conversation.wait();
    const phone = Number(message.msg.text);

    const result = checkPhoneNumber(phone);

    if (!result) {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");

      return null;
    }

    return phone;
  } catch (err) {
    console.log(err);
  }
};
