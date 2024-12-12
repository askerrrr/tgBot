module.exports.getDateAndTime = () => {
  var date = new Date();

  var second = date.getSeconds();
  second = second < 10 ? "0" + second : second;

  var minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var hours = date.getHours();
  hours = hours < 10 ? "0" + hours : hours;

  var day = date.getDate();
  day = day < 10 ? "0" + day : day;

  var month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;

  var year = date.getFullYear();

  return {
    time: () => {
      return `${hours}:${minutes}:${second}`;
    },
    date: () => {
      return `${day}.${month}.${year}`;
    },
    fullDateTime() {
      return `${day}.${month}.${year} - ${hours}:${minutes}:${second} `;
    },
  };
};
