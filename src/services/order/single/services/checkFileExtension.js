const { getFileUrl } = require("../../../different/getFileURL");

module.exports.checkFileExtension = async (ctx, imageId) => {
  const fileUrl = await getFileUrl(ctx, imageId);

  const fileExtension = fileUrl.split(".")[3].toLowerCase();

  const extensionArr = ["jpg", "jpeg", "png", "webp", "svg", "gif"];

  return extensionArr.includes(fileExtension)
    ? `${fileUrl}::${imageId}`
    : false;
};
