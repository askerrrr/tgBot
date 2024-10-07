function checkPhoneNumber(phone) {
  return (
    String(phone).length < 12 &&
    String(phone).length > 10 &&
    typeof phone === "number"
  );
}

module.exports = { checkPhoneNumber };
