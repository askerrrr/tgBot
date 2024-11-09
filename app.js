const { env } = require("./env");
const { Bot } = require("grammy");
const express = require("express");

const app = express();
const bot = new Bot(env.bot_token);

const corsOptions = {
  methods: ["POST"],
  origin: "https://test-nodejs.ru",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", corsOptions.origin);
  res.setHeader("Access-Control-Allow-Methods", corsOptions.methods.join(","));
  res.setHeader(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(",")
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.post("http://62.109.30.45:3000", async (req, res) => {
  try {
    const requestPayload = req.body;

    const userId = requestPayload.userId;
    const fileId = requestPayload.fileId;
    const status = requestPayload.status;

    const message = `Статус заказа ${fileId} изменен на ${status}`;

    await bot.api.sendMessage(userId, message);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    await bot.api.sendMessage(env.admin_id, `${err.message}`);
  }
});

app.listen(3000, () => console.log("Сервер запущен"));
