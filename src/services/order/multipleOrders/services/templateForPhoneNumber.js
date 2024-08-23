function templateForPhoneNumber(arg) {
  return `${arg[0]} (${arg[1]}${arg[2]}${arg[3]})-${arg[4]}${arg[5]}${arg[6]}-${arg[7]}${arg[8]}-${arg[9]}${arg[10]}`;
}
module.exports = { templateForPhoneNumber };
