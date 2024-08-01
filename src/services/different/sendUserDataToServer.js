const env = require("../../../env");

module.exports.sendUserDataToServer = async (userData) => {
  const response = await fetch("http://localhost:3000/telegramuser", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.auttoken}`,
    },
  });
  const users = await response.json();
  return users;
};
