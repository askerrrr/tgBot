module.exports.shorteningTheString = async (val) => {
  var arr = [];
  var arr1 = [];

  var a = String(val).split("");
  var b = String(val).split("").reverse();

  for (let i = 0; i < a.length; i++) {
    if (a[i].includes(".")) break;
    arr.push(a[i]);

    if (b[i].includes(".")) break;
    arr1.push(b[i]);
  }

  val = arr.join("") + "." + arr1.reverse().slice(0, 2).join("");
  return Number(val);
};
