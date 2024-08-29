const { env } = require("../../../../env");
const { getCNYValuteValue } = require("./getCNYValuteValue");
const { shorteningTheString } = require("./shorteningTheString");

async function gettingTheValueInRubles(userValue) {
  let valuteValue = await getCNYValuteValue();

  let result =
    (valuteValue + env.yuanCommission) * userValue * (1 + env.sellerCommission);

  return shorteningTheString(result);
}

module.exports = { gettingTheValueInRubles };
