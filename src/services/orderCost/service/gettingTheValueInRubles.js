const { getCNYValuteValue } = require("./getCNYValuteValue");

async function gettingTheValueInRubles(value) {
  let num = await getCNYValuteValue();
  return value * (num + 1.3);
}

module.exports = { gettingTheValueInRubles };
