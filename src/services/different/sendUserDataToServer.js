const JWT = require("jsonwebtoken");
const { env } = require("../../../env");
const { addNewUser } = require("../../database/services/addNewUser");

module.exports.sendUserDataToServer = async (userData) => {
  try {
    const response = await fetch(env.bot_api_users, {
      method: "POST",
      body: JSON.stringify(userData),
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

    await addNewUser(userData);
  } catch (err) {
    console.error("Failed to send user data to server:", err);
    throw err;
  }

  //экспорт в src/chatMember/chatMember.js
};
