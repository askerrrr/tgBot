const { env } = require("./env");
const { Bot } = require("grammy");
const express = require("express");

const app = express();
const bot = new Bot(env.bot_token);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("https://62.109.30.45", async (req, res) => {
  try {
    const requestPayload = req.body;

    const userId = requestPayload.userId;
    const fileId = requestPayload.fileId;
    const status = requestPayload.status;

    const message = `Статус заказа ${fileId} изменен на ${status}`;

    await bot.api.sendMessage(userId, message);
  } catch (err) {
    console.log(err);
    await bot.api.sendMessage(env.admin_id, `${err.message}`);
  }
});

app.listen(3000);
