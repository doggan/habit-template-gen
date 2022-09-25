import _ from "lodash";

// Month here is 1-indexed (January is 1, February is 2, etc). This is
// because we're using 0 as the day so that it returns the last day
// of the last month, so you have to add 1 to the month number
// so it returns the correct amount of days
// Ref: https://stackoverflow.com/a/1184359/3518049
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(year, month, day) {
  const dayOfWeek = new Date(year, month, day).getDay();
  return isNaN(dayOfWeek)
    ? null
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const COL_COUNT = 31;

const MonthLayout = ({ month, year, habits }) => {
  const renderTable = (month, year) => {
    const renderHeader = () => {
      const numDaysInMonth = daysInMonth(month, year);
      const dayNumbers = _.range(1, COL_COUNT + 1).map((day) => {
        const key = day;
        return day <= numDaysInMonth ? (
          <th key={key}>
            {day}
            <br />
            <span className="day-name">{getDayOfWeek(year, month, day)}</span>
          </th>
        ) : (
          <th key={key}></th>
        );
      });

      return (
        <thead>
          <tr className="center aligned">
            <th className="left-col">
              {MONTHS[month]} {year}
            </th>
            {dayNumbers}
          </tr>
        </thead>
      );
    };

    const renderBody = () => {
      const emptyCells = _.range(COL_COUNT).map((i) => <td key={i}></td>);
      const renderedRows = habits.map((habit) => {
        return (
          <tr key={habit.id} className="right aligned">
            <td className="left-col">{habit.text}</td>
            {emptyCells}
          </tr>
        );
      });

      return <tbody>{renderedRows}</tbody>;
    };

    return (
      <table className="ui celled table fixed compact small unstackable single line">
        {renderHeader()}
        {renderBody()}
      </table>
    );
  };

  return <div>{renderTable(month, year)}</div>;
};

export default MonthLayout;
