module.exports.checkPhoneNumber = (phone) =>
  String(phone).length < 12 &&
  String(phone).length > 10 &&
  typeof phone === "number";
