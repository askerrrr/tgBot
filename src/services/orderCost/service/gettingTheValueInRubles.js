const { getCNYValuteValue } = require("./service/getCNYValuteValue");

function gettingTheValueInRubles(value) {
  return value * getCNYValuteValue;
}

module.exports = { gettingTheValueInRubles };
