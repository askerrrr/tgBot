module.exports.getCNYValuteValue = async () => {
  let res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

  let valute = await res.json();

  return valute.Valute.CNY.Value;
};
