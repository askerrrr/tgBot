const { env } = require("./env");
const { Bot } = require("grammy");
const express = require("express");
const { deleteOrder } = require("./src/database/services/deleteOrder");
const { statusTranslate } = require("./src/services/different/statusTranslate");
const {
  updateOrderStatus,
} = require("./src/database/services/updateOrderStatus");

const app = express();
const bot = new Bot(env.bot_token);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${env.main_server}`);
  res.setHeader("Access-Control-Allow-Methods", "PATCH, DELETE, OPTIONS");
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

app.patch("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.sendStatus(401);

    if (authHeader.split(" ")[1] !== env.bearer_token)
      return res.sendStatus(401);

    const requestPayload = req.body;

    const userId = requestPayload.userId;
    const orderId = requestPayload.orderId;
    const status = requestPayload.status;
    const updatedStatus = await updateOrderStatus(userId, orderId, status);

    if (!updatedStatus) console.log("Ошибка при обновлении статуса");

    const message = `Статус заказа ${orderId} изменен.\nТекущий статус:\n${statusTranslate(
      status
    )}`;

    await bot.api.sendMessage(userId, message).then(() => res.sendStatus(200));
  } catch (err) {
    console.log(err);
    return await bot.api.sendMessage(env.admin_id, `${err.message}`);
  }
});

app.delete("/", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  if (authHeader.split(" ")[1] !== env.bearer_token) return res.sendStatus(401);

  const requestPayload = req.body;
  const userId = requestPayload.userId;
  const orderId = requestPayload.orderId;

  await deleteOrder(userId, orderId)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(404));
});

app.listen(env.PORT, () => console.log("Сервер запущен"));
