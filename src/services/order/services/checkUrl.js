var { validOrigin, validProtocol } = require("./validUrlParams");

module.exports.checkUrl = async function (url) {
  try {
    var result = new URL(url);

    if (
      validOrigin.includes(result.origin) &&
      validProtocol.includes(result.protocol)
    ) {
      return result.href;
    }

    return;
  } catch (err) {
    if (err.message === "Invalid URL") {
      url = url
        .split(" ")
        .find((item) => item.startsWith("http:") || item.startsWith("https:"));

      if (!url) return;

      try {
        var result = new URL(url);

        if (
          validOrigin.includes(result.origin) &&
          validProtocol.includes(result.protocol)
        ) {
          return result.href;
          f;
        }
      } catch {
        return;
      }
    }

    return;
  }
};
