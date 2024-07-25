function row(user) {
  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");

  const tdId = document.createElement("td");
  tdId.append(user._id);
  tr.append(tdId);

  const tdName = document.createElement("td");
  tdName.append(user.first_name);
  tr.append(tdName);

  const tdTelegramId = document.createElement("td");
  tdTelegramId.append(user.id);
  tr.append(tdTelegramId);

  tbody.append(tr);

  return tbody;
}

async function GetUsers() {
  const response = await fetch("/telegramuser", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const users = await response.json();

  users.forEach((user) => row(user));
}

GetUsers();
