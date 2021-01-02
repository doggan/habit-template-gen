import _ from "lodash";

// Month here is 1-indexed (January is 1, February is 2, etc). This is
// because we're using 0 as the day so that it returns the last day
// of the last month, so you have to add 1 to the month number
// so it returns the correct amount of days
// Ref: https://stackoverflow.com/a/1184359/3518049
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();
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

const getUniqueKey = (month, year, activity) => {
  return `${year}-${month}-${activity}`;
};

const MonthLayout = ({ month, year, activities }) => {
  const renderTable = (month, year) => {
    const renderHeader = () => {
      const numDaysInMonth = daysInMonth(month, year);
      const dayNumbers = _.range(1, COL_COUNT + 1).map((val) => {
        const key = getUniqueKey(month, year, val);
        return val <= numDaysInMonth ? (
          <th key={key}>
            {val}
            <br />
            <span className="day-name">
              {getDayOfWeek(`${year}-${month + 1}-${val}`)}
            </span>
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
      const renderRow = (activity) => {
        return (
          <tr
            key={getUniqueKey(month, year, activity)}
            className="right aligned"
          >
            <td className="left-col">{activity}</td>
            {emptyCells}
          </tr>
        );
      };

      const renderedRows = activities.map((activity) => renderRow(activity));

      return <tbody>{renderedRows}</tbody>;
    };

    return (
      <table className="ui celled table fixed compact small unstackable single line">
        {renderHeader()}
        {renderBody()}
      </table>
    );
  };

  if (!activities || activities.length < 1) {
    return <div>Enter at least 1 activity.</div>;
  }

  return <div>{renderTable(month, year)}</div>;
};

export default MonthLayout;
