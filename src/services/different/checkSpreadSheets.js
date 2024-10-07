function checkSpreadSheets(url) {
  const str = url.split("/");
  return (
    str[0] === "https:" &&
    str[2] === "docs.google.com" &&
    str[3] === "spreadsheets" &&
    str[5].length === 44
  );
}

module.exports = { checkSpreadSheets };
