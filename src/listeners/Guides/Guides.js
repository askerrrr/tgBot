const { guideFor1688 } = require("./1688");
const { guideForTaobao } = require("./Taobao");
const { guideForPoizon } = require("./Poizon");
const { guideForPinduoduo } = require("./Pinduoduo");

module.exports.guides = async (bot) => {
  guideFor1688(bot);
  guideForTaobao(bot);
  guideForPoizon(bot);
  guideForPinduoduo(bot);
};
