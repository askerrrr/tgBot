const { getCNYValuteValue } = require("./getCNYValuteValue");
const {
  shortingStringAndConvertToNumber,
} = require("./shortingStringAndConvertToNumber");

async function gettingTheValueInRubles(value) {
  let num = await getCNYValuteValue();
  return value * (num + 1.3);
}

module.exports = { gettingTheValueInRubles };
