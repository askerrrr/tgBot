const {
  shortingStringAndConvertToNumber,
} = require("../shortingStringAndConvertToNumber");

async function getCNYValuteValue() {
  let res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  let valute = await res.json();
  return shortingStringAndConvertToNumber(valute);
}

module.exports = { getCNYValuteValue };
