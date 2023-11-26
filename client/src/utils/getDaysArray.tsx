import moment from "moment";
//? This is the function that will return the days of the month in a matrix format,
//? so that we can easily display it in a table format.
//? The function takes an optional parameter of month, which is the index of the month
//? in the year, if no parameter is passed, it will take the current month.
//? I've used chat gpt to generate this function using the moment js library which makes working with dates easier.
export function getMonth(month = moment().month()) {
  //? Consider the current month if month is not passed
  month = Math.floor(month);
  //? current year
  const year = moment().year();
  //? we need to know the first day of the month to know how many days are there in the previous month,
  //?like for this month November we have 29,30,31 days of October so if we just use the month index and
  //? generate it we get the dates from November 1 to November 30 and it becomes difficult for us to create
  //? the week / month view using this date
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
  //? The output of this function is a matrix of days of the month, which can be easily displayed in a table format.
  // [
  //   [DATE, DATE, DATE, DATE, DATE, DATE , DATE], --> represents a week
  //  [DATE, DATE, DATE, DATE, DATE, DATE , DATE]
  // ]
}
console.table(getMonth());
