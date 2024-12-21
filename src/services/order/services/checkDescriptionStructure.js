module.exports.checkDescriptionStructure = (desc) =>
  desc?.size
    ? `Размер: ${desc.size}\nКоличество: ${desc.qty}`
    : `Количество: ${desc.qty}`;
