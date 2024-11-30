var { env } = require("../../../../env");
var { getCNYValuteValue } = require("./getCNYValuteValue");
var { shorteningTheString } = require("./shorteningTheString");

module.exports.convertYuanToRubles = async (userValue) => {
  let valuteValue = await getCNYValuteValue();

  let result =
    (valuteValue + env.yuanCommission) * userValue * (1 + env.sellerCommission);

  return shorteningTheString(result);
};
