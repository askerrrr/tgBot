const { env } = require("./env");
const { Bot } = require("grammy");
const express = require("express");
const { verifyToken } = require("./src/services/different/verifyToken");
const {
  updateOrderStatus,
} = require("./src/database/services/updateOrderStatus");
const { statusTranslate } = require("./src/services/different/statusTranslate");

const app = express();
const bot = new Bot(env.bot_token);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    ["Content-Type", "Authorization"].join(",")
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.post("/", async (req, res) => {
  try {
    const requestPayload = req.body;

    const userId = requestPayload.userId;
    const fileId = requestPayload.fileId;
    const status = requestPayload.status;

    const validToken = verifyToken(req.headers.authorization);

    if (!validToken) return res.status(401).json({ error: "Unauthorized" });

    await updateOrderStatus(userId, fileId, status);

    const message = `Статус заказа ${fileId} изменен на ${statusTranslate(
      status
    )}`;

    console.log("POST запрос принят");
    await bot.api.sendMessage(userId, message);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    await bot.api.sendMessage(env.admin_id, `${err.message}`);
  }
});

app.listen(3000, () => console.log("Сервер запущен"));
