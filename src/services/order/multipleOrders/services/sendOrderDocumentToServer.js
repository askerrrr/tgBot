const crypto = require("crypto");
const { env } = require("../../../../../env");
const { getFileUrl } = require("../../../different/getFileURL");
const { getDateAndTime } = require("../../../different/dateAndTime");

async function sendOrderDocumentToServer(ctx, order) {
  try {
    const orderTime = getDateAndTime().fullTime();
    const fileURL = await getFileUrl(ctx, order.fileId);
    const randomKey = crypto.randomBytes(10).toString("hex");

    const data = {
      url: "",
      file: { url: fileURL, id: randomKey },
      date: orderTime,
      tgId: order.chatId,
      phone: order.phone,
      description: "Документ",
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
