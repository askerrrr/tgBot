module.exports.checkStrLength = (str) =>
  str?.size ? `кол-во: ${str.qty}\nРазмер : ${str.size}` : `кол-во: ${str.qty}`;
