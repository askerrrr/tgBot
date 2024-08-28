const { getCNYValuteValue } = require("./getCNYValuteValue");

async function gettingTheValueInRubles(value) {
  let num = await getCNYValuteValue();
  return value * num;
}

module.exports = { gettingTheValueInRubles };
