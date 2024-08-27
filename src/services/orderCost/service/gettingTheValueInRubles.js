const { getCNYValuteValue } = require("./getCNYValuteValue");

function gettingTheValueInRubles(value) {
  return value * getCNYValuteValue;
}

module.exports = { gettingTheValueInRubles };
