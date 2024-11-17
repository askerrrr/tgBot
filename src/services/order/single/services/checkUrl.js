const { validOrigin, validProtocol } = require("./validUrlParams");

exports.checkUrl = async function (url, ctx) {
  try {
    const result = new URL(url);
    console.log(result);

    if (
      validOrigin.includes(result.origin) &&
      validProtocol.includes(result.protocol)
    ) {
      return await ctx.reply(result.href);
    }

    return;
  } catch (err) {
    if (err.message === "Invalid URL") {
      url = url.split(" ").find((item) => item.startsWith("http:" || "https:"));

      if (!url) return await ctx.reply("Невалидный URL");

      const result = new URL(url);
      console.log(result);

      if (
        validOrigin.includes(result.origin) &&
        validProtocol.includes(result.protocol)
      ) {
        return await ctx.reply(result.href);
      }
    }

    return;
  }
};
