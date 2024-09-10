const fs = require("fs");

async function convertImageToJSON(image) {
  const imgInput = fs.readFile(image);

  const base64img = imgInput.toString("base64");

  const jsonObject = {
    imgInput: base64img,
  };
  return jsonObject;
}

module.exports = { convertImageToJSON };
