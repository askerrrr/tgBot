const { getFileUrl } = require("./getFileURL");

module.exports.checkFileExtension = async (ctx, fileId) => {
  const fileUrl = await getFileUrl(ctx, fileId);

  const fileExtension = fileUrl.split(".")[3].toLowerCase();

  const extensionArr = ["jpg", "jpeg", "png", "webp", "svg", "gif"];

  return extensionArr.includes(fileExtension) ? `${fileUrl}::${fileId}` : false;
};
