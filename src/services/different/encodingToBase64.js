function encodingToBase64(fileURL) {
  try {
    const blob = fileURL.blob();

    const arrayBuffer = blob.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const base64 = buffer.toString("base64");

    return base64
  } catch (err) {
    console.log("Ошибка при чтении или преобразовании файла", err.message);
  }
}

module.exports = { encodingToBase64 };
