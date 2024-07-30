async function getCNY() {
  let res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  let json = await res.json();
  return json;
}

module.exports = { getCNY };
