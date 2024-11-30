var { checkPhoneNumber } = require("../../services/checkPhoneNumber");

module.exports.getPhone = async (ctx, conversation) => {
  try {
    await ctx.reply(
      "Напишите номер вашего телефона без пробелов, скобок и дефисов"
    );

    var message = await conversation.wait();
    var phone = Number(message.msg.text);

    var result = checkPhoneNumber(phone);

    if (!result) {
      await ctx.reply("Некорректный номер телефона. Попробуйте снова.");

      return null;
    }

    return phone;
  } catch (err) {
    console.log(err);
  }
};
