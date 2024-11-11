module.exports.checkUrl = (url) => {
  return url.split(":")[0].includes("https") ? url : false;
};
