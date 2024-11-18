module.exports.checkDescription = async function (desctiption) {
  if (!Number(desctiption[0])) return;

  if (+desctiption[0] <= 0) return;

  return desctiption;
};
