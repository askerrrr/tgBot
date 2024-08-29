const { getCNYValuteValue } = require("./getCNYValuteValue");
const { shorteningTheString } = require("./shorteningTheString");
async function gettingTheValueInRubles(userValue) {
  let valuteValue = await getCNYValuteValue();

  let result = (valuteValue + 1.3) * userValue;
  console.log(result);
  return shorteningTheString(result);
}

module.exports = { gettingTheValueInRubles };
