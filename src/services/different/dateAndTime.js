function getDateAndTime() {
  const date = new Date();

  let second = date.getSeconds();
  second = second < 10 ? "0" + second : second;

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let hours = date.getHours();
  hours = hours < 10 ? "0" + hours : hours;

  let day = date.getDay();
  day = day < 10 ? "0" + day : day;

  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;

  let year = date.getFullYear();

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
