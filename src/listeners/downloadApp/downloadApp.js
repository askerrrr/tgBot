const { link1688 } = require("./1688");
const { linkTaobao } = require("./Taobao");
const { linkPoizon } = require("./Poizon");
const { linkPinduoduo } = require("./Pinduoduo");

module.exports.downloadApp = async (bot) => {
  link1688(bot);
  linkTaobao(bot);
  linkPoizon(bot);
  linkPinduoduo(bot);
};
