function shortingStringAndConvertToNumber(str) {
  return Number(String(str.Valute.CNY.Value).slice(0, 5));
}

module.exports = { shortingStringAndConvertToNumber };
