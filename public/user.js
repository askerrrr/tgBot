const {
  url,
  image,
  quantityAndSize,
  userPhoneNumber,
} = require("../src/services/order/singleOrder");

function row() {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");

  const tdUrl = document.createElement("td");
  tdUrl.append(url);
  tr.append(tdUrl);

  const tdImage = document.createElement("td");
  tdImage.append(image);
  tr.append(tdImage);

  const tdQuantityAndSize = document.createElement("td");
  tdQuantityAndSize.append(quantityAndSize);
  tr.append(tdQuantityAndSize);

  const tdUserPhoneNumber = document.createElement("td");
  tdUserPhoneNumber.append(userPhoneNumber);
  tr.append(tdUserPhoneNumber);

  tbody.append(tr);
  return tbody;
}

async function GetUserOrder() {
  const response = await fetch("/telegramuser/user", {
    method: "GET",
    headers: { Accept: "application.json" },
  });
  const usersOrder = await response.json();
  usersOrder.forEach((order) => row(order));
}
GetUserOrder();
