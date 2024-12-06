module.exports.getCNYValuteValue = async () => {
  var res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

  var valute = await res.json();

  return valute.Valute.CNY.Value;
};
