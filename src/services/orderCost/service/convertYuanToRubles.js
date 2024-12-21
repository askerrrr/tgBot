var { env } = require("../../../../env");
var { getCNYValuteValue } = require("./getCNYValuteValue");
var { shorteningTheString } = require("./shorteningTheString");

module.exports.convertYuanToRubles = async (val) => {
  var valuteValue = await getCNYValuteValue();

  var result =
    (valuteValue + env.yuanCommission) * val * (1 + env.sellerCommission) + "";

  return await shorteningTheString(result);
};
