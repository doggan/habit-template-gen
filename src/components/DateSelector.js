import "./DateSelector.css";

const DateSelector = ({
  currentMonth,
  currentYear,
  monthCount,
  onMonthChange,
  onYearChange,
  onMonthCountChange,
}) => {
  const getMonthDisplay = () => {
    // Javascript months are base 0, so we add 1 for visual display.
    return currentMonth + 1;
  };

  return (
    <div>
      <div className="input-wrapper">
        Start Month:&nbsp;
        <input
          type="number"
          value={getMonthDisplay()}
          onChange={(e) => onMonthChange(e.target.value - 1)}
          min="1"
          max="12"
        />
      </div>
      <div className="input-wrapper">
        Start Year:&nbsp;
        <input
          type="number"
          value={currentYear}
          onChange={(e) => onYearChange(e.target.value)}
          min="0"
          max="9999"
        />
      </div>
      <div className="input-wrapper">
        Number of Months:&nbsp;
        <input
          type="number"
          value={monthCount}
          onChange={(e) => onMonthCountChange(e.target.value)}
          min="1"
          max="12"
        />
      </div>
    </div>
  );
};

export default DateSelector;
