module.exports.checkDescription = async (qty, size) =>
  qty > 0 && qty < 1e4 && size.length < 20 ? { qty, size } : null;
