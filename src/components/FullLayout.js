import MonthLayout from "./MonthLayout";
import "./MonthLayout.css";

const getDesiredMonths = (startMonth, startYear, monthCount) => {
  let desiredMonths = [];
  let currentMonth = startMonth;
  let currentYear = startYear;
  for (let i = 0; i < monthCount; i++) {
    desiredMonths.push({
      month: currentMonth,
      year: currentYear,
    });

    currentMonth++;
    if (currentMonth >= 12) {
      currentMonth = 0;
      currentYear += 1;
    }
  }

  return desiredMonths;
};

const FullLayout = ({ startMonth, startYear, monthCount, habits }) => {
  const desiredMonths = getDesiredMonths(startMonth, startYear, monthCount);
  const renderedMonths = desiredMonths.map((val) => {
    return (
      <div key={`${val.year}-${val.month}`} className="item">
        <MonthLayout month={val.month} year={val.year} habits={habits} />
      </div>
    );
  });

  return <div className="ui items">{renderedMonths}</div>;
};

export default FullLayout;
