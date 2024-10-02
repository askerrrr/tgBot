const { env } = require("../../../../env");
const { getDateAndTime } = require("../../different/dateAndTime");
const { addNewOrder } = require("../../../../dataBase");
async function sendOrderDocumentToServer(order, randomKey) {
  try {
    const orderTime = getDateAndTime().fullTime();

    const newOrder = {
      date: orderTime,
      tgId: order.chatId,
      phone: order.phone,
      file: { url: order.fileURL, id: randomKey },
    };

    console.log(newOrder);

    await addNewOrder(newOrder);

    const response = await fetch(env.orderinfo, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.auth_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Server error : ${response.status} ${response.text}`);
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

module.exports = { sendOrderDocumentToServer };
