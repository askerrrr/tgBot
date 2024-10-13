const { link1688 } = require("./1688");
const { linkTaobao } = require("./Taobao");
const { linkPoizon } = require("./Poizon");
const { linkPinduoduo } = require("./Pinduoduo");

function downloadApp(bot) {
  link1688(bot);
  linkTaobao(bot);
  linkPoizon(bot);
  linkPinduoduo(bot);
}

module.exports = { downloadApp };
