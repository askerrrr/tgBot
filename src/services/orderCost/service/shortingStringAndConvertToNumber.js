function shortingStringAndConvertToNumber(val) {
  const arr = [];
  const arr1 = [];
  const a = String(val.Valute.CNY.Value).split("");
  const b = String(val.Valute.CNY.Value).split("").reverse();

  for (let i = 0; i < a.length; i++) {
    if (a[i].includes(".")) break;
    arr.push(a[i]);
  }

  for (let i = 0; i < b.length; i++) {
    if (b[i].includes(".")) break;
    arr1.push(b[i]);
  }

  return Number(`${arr.join("")}.${arr1.reverse().slice(0, 2).join("")}`) + 1.3;
}

module.exports = { shortingStringAndConvertToNumber };
