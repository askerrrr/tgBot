const JWT = require("jsonwebtoken");
const { env } = require("../../../../env");

async function sendOrderFileToServer(order) {
  try {
    const response = await fetch(env.bot_api_order, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT.sign(env.payload, env.secret, {
          expiresIn: "5m",
        })}`,
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

module.exports = { sendOrderFileToServer };
