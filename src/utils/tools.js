export function formatDate(timestamp, part) {
  if (!timestamp) return;
  let date = new Date(parseInt(timestamp));

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  const prefixZero = (num) => {
    return num < 10 ? "0" + num : num;
  };
  prefixZero(year);
  prefixZero(month);
  prefixZero(day);
  prefixZero(hour);
  prefixZero(minutes);
  prefixZero(seconds);

  let week = weekArr[date.getDay()];

  let str = "";
  switch (part) {
    case "year":
      str = `${year}-${month}-${day}`;
      break;
    case "time":
      str = `${hour}:${minutes}:${seconds}`;
      break;
    case "year-time":
      str = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
      break;
    case "time-week":
      str = `${hour}:${minutes}:${seconds} ${week}`;
      break;
    default:
      str = `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${week}`;
  }
  return str;
}
