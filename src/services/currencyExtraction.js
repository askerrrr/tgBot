async function getCNY() {
  let res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  let json = await res.json();
  return json;
}
function getDate() {
  const date = new Date();
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

module.exports = { getCNY, getDate };
