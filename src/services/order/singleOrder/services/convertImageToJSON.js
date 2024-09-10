const fs = require("fs");

async function convertImageToJSON(image) {
  try {
    const imgInput = fs.readFile(image);

    const base64img = imgInput.toString("base64");

    const jsonObject = {
      img: base64img,
    };
    return jsonObject;
  } catch (err) {
    console.log("Ошибка при чтении или преобразовании файла", err);
  }
}

module.exports = { convertImageToJSON };
