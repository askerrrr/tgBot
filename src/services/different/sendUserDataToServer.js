const JWT = require("jsonwebtoken");
const { env } = require("../../../env");

module.exports.sendUserDataToServer = async (data) => {
  try {
    console.log(data);
    const response = await fetch(env.bot_api_users, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT.sign(env.payload, env.bot_secret_key, {
          expiresIn: "5m",
        })}`,
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
    console.error("Failed to send user data to server:", err);
    throw err;
  }

  //экспорт в src/chatMember/chatMember.js
};
