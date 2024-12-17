module.exports.checkDescription = async (description) =>
  Number(description[0]) && +description[0] > 0 ? description : null;
