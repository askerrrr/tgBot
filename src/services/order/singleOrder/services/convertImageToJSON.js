const fs = require("fs");

async function convertImageToJSON(image) {
  try {
    const imgInput = fs.readFile(image);

    const base64img = imgInput.toString("base64");

    return base64img;
  } catch (err) {
    console.log("Ошибка при чтении или преобразовании файла", err);
  }
}

module.exports = { convertImageToJSON };
