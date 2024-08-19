function getDateAndTime() {
  const date = new Date();

  const second =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return {
    getTime: () => {
      return `${hours}:${minutes}:${second}`;
    },
    getDate: () => {
      return `${day}.${month}.${year}`;
    },
    fullTime() {
      return `${hours}:${minutes}:${second} - ${day}.${month}.${year}`;
    },
  };
}
module.exports = { getDateAndTime };
