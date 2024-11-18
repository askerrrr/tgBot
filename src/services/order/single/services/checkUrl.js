const { validOrigin, validProtocol } = require("./validUrlParams");

exports.checkUrl = async function (url) {
  try {
    const result = new URL(url);

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
        const result = new URL(url);

        if (
          validOrigin.includes(result.origin) &&
          validProtocol.includes(result.protocol)
        ) {
          return result.href;f
        }
      } catch {
        return;
      }
    }

    return;
  }
};
