import moment from "moment";
export function getMonth(month = moment().month()) {
  month = Math.floor(month);
  const year = moment().year();

  const firstDayOfTheMonth = moment(new Date(year, month, 1)).day();
  const daysInMonth = moment(new Date(year, month + 1, 0)).date();
  const weeksInMonth = Math.ceil((daysInMonth + firstDayOfTheMonth) / 7);
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(weeksInMonth).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return moment(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}
