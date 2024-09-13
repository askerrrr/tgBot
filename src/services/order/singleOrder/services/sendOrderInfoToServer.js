const { env } = require("../../../../../env");
const { getDateAndTime } = require("../../../different/dateAndTime");
const { encodingImageToBase64 } = require("./encodingImageToBase64");

module.exports.sendOrderInfoToServer = async (data) => {
  try {
    const image = await encodingImageToBase64(data.image);

    const response = await fetch(env.URLForSendingOrderInfo, {
      method: "POST",
      body: JSON.stringify({
        tgId: data.ctx.chat.id,
        url: data.url,
        img: image,
        description: data.quantityAndSize,
        phone: data.userPhoneNumber,
        date: getDateAndTime().fullTime(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.auth_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`
      );
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Unexpected content type: ${contentType}\n${text}`);
    }
  } catch (err) {
    console.log(err);
  }
};
