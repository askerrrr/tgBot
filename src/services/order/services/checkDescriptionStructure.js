module.exports.checkDescriptionStructure = (desc) =>
  desc?.size
    ? `кол-во: ${desc.qty}\nРазмер: ${desc.size}`
    : `кол-во: ${desc.qty}`;
