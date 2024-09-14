function encodingToBase64(buffer) {
  try {
    const base64 = buffer.toString("base64");

    return base64;
  } catch (err) {
    console.log("Ошибка при чтении или преобразовании файла", err.message);
  }
}

module.exports = { encodingToBase64 };
