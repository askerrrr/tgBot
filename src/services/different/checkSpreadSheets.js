function checkSpreadSheets(url) {
  return url.split("/")[3] === "spreadsheets";
}

module.exports = { checkSpreadSheets };
