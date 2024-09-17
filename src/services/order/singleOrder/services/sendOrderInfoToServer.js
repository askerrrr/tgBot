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

    const data = {
      url: url,
      tgId: chatID,
      img: imageURL,
      date: orderTime,
      phone: userPhoneNumber.msg.text,
      description: quantityAndSize,
    };
    console.log(data);
    const response = await fetch(env.orderinfo, {
      method: "POST",
      body: JSON.stringify(data),
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
