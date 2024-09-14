const { env } = require("../../../../../env");
const { getDateAndTime } = require("../../../different/dateAndTime");
const { encodingImageToBase64 } = require("../../../different/encodingImageToBase64");
const { getFileUrl } = require("../../../different/getFileURL");

async function sendOrderInfoToServer(
  ctx,
  chatID,
  url,
  image,
  quantityAndSize,
  userPhoneNumber
) {
  try {
    const imageURL = await getFileUrl(ctx, image);
    const imageBase64 = encodingImageToBase64(imageURL);

    const response = await fetch(env.URLForSendingOrderInfo, {
      method: "POST",
      body: JSON.stringify({
        tgId: chatID,
        url: url,
        img: imageBase64,
        description: quantityAndSize,
        phone: userPhoneNumber,
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
}

module.exports = { sendOrderInfoToServer };
