const fs = require("fs");

function encodingImageToBase64(image) {
  try {
    const imgInput = fs.readFileSync(image);

    const base64img = imgInput.toString("base64");
    return base64img;
  } catch (err) {
    console.log("Ошибка при чтении или преобразовании файла", err);
  }
}

module.exports = { encodingImageToBase64 };
