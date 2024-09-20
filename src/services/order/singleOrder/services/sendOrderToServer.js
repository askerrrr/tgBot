const { env } = require("../../../../../env");
const { getFileUrl } = require("../../../different/getFileURL");
const { getDateAndTime } = require("../../../different/dateAndTime");

async function sendOrderToServer(order) {
  try {
    const imageURL = await getFileUrl(order.ctx, order.image);
    const orderTime = getDateAndTime().fullTime();

    const data = {
      file: imageURL,
      url: order.url,
      date: orderTime,
      tgId: order.chatId,
      description: order.quantityAndSize,
      phone: order.userPhoneNumber,
    };
    console.log(data);
    const response = await fetch(env.orderinfo, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.auth_token}`,
      },
      body: JSON.stringify(data),
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

module.exports = { sendOrderToServer };
