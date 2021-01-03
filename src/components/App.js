import React from "react";
import { useState, useRef } from "react";
import "./App.css";
import Habits from "./Habits";
import DateSelector from "./DateSelector";
import DownloadButton from "./DownloadButton";
import Footer from "./Footer";
import FullLayout from "./FullLayout";

const App = () => {
  const [startMonth, setStartMonth] = useState(new Date().getMonth());
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [monthCount, setMonthCount] = useState(3);
  const [habits, setHabits] = useState([
    "Exercise",
    "Meditate",
    "Practice piano",
    "Study chess",
    "Read",
  ]);

  const refRenderRoot = useRef(null);

  return (
    <div className="app">
      <h1 className="ui center aligned header">
        Habit Tracker - Template Generator
      </h1>
      <div className="ui container segment">
        <div className="ui grid">
          <div className="eight wide column">
            <Habits
              habits={habits}
              onClickDeleteHabit={(index) =>
                setHabits(habits.filter((_, i) => i !== index))
              }
              onClickAddHabit={(newHabit) => setHabits([...habits, newHabit])}
            />
          </div>
          <div className="eight wide column">
            <DateSelector
              currentMonth={startMonth}
              currentYear={startYear}
              monthCount={monthCount}
              onMonthChange={setStartMonth}
              onYearChange={setStartYear}
              onMonthCountChange={setMonthCount}
            />
          </div>
        </div>
      </div>

      <div className="ui">
        <div className="ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            <div className="download-button">
              <DownloadButton refRenderRoot={refRenderRoot} />
            </div>
          </div>
        </div>
        <div ref={refRenderRoot}>
          <FullLayout
            startMonth={startMonth}
            startYear={startYear}
            monthCount={monthCount}
            habits={habits}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
