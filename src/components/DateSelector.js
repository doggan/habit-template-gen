import _ from "lodash";
import Dropdown from "./Dropdown";
import "./DateSelector.css";

const MONTH_OPTIONS = [
  {
    label: "January",
    value: "0",
  },
  {
    label: "February",
    value: "1",
  },
  {
    label: "March",
    value: "2",
  },
  {
    label: "April",
    value: "3",
  },
  {
    label: "May",
    value: "4",
  },
  {
    label: "June",
    value: "5",
  },
  {
    label: "July",
    value: "6",
  },
  {
    label: "August",
    value: "7",
  },
  {
    label: "September",
    value: "8",
  },
  {
    label: "October",
    value: "9",
  },
  {
    label: "November",
    value: "10",
  },
  {
    label: "December",
    value: "11",
  },
];

const DateSelector = ({
  currentMonth,
  currentYear,
  monthCount,
  onMonthChange,
  onYearChange,
  onMonthCountChange,
}) => {
  const getCurrentMonth = () => {
    return MONTH_OPTIONS[currentMonth];
  };

  const getYearOptions = () => {
    const offset = 5;
    const startYear = new Date().getFullYear();
    return _.range(startYear - offset, startYear + offset).map(yearToOption);
  };

  const yearToOption = (year) => {
    return {
      label: year,
      value: year,
    };
  };

  const getDurationOptions = () => {
    const minDuration = 1;
    // TODO(shyam): we should be able to support up to 12 months,
    // but PDF gen currently doesn't support multi-page printing.
    const maxDuration = 4;
    return _.range(minDuration, maxDuration + 1).map(durationToOption);
  };

  const durationToOption = (duration) => {
    return {
      label: duration > 1 ? `${duration} months` : `${duration} month`,
      value: duration,
    };
  };

  return (
    <div>
      <Dropdown
        label={"Start month:"}
        options={MONTH_OPTIONS}
        selected={getCurrentMonth()}
        onSelectedChange={(selection) => onMonthChange(selection.value)}
      />

      <Dropdown
        label={"Start year:"}
        options={getYearOptions()}
        selected={yearToOption(currentYear)}
        onSelectedChange={(selection) => onYearChange(selection.value)}
      />

      <Dropdown
        label={"Duration:"}
        options={getDurationOptions()}
        selected={durationToOption(monthCount)}
        onSelectedChange={(selection) => {
          console.log(selection.value);
          onMonthCountChange(selection.value);
        }}
      />
    </div>
  );
};

export default DateSelector;
