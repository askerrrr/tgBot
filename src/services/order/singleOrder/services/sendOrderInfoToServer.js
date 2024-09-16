const { env } = require("../../../../../env");
const { getFileUrl } = require("../../../different/getFileURL");
const { getDateAndTime } = require("../../../different/dateAndTime");

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
    const orderTime = getDateAndTime().fullTime();

    const response = await fetch(env.URLForSendingUserInfo, {
      method: "POST",
      body: JSON.stringify({
        url: url,
        tgId: chatID,
        img: imageURL,
        date: orderTime,
        phone: userPhoneNumber,
        description: quantityAndSize,
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
