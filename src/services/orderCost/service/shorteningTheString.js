module.exports.shorteningTheString = async (value) => {
  var [a, b] = value.split(".");

  return a + "." + b.slice(0, 2);
};
