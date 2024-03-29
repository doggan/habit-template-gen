import React from "react";
import { useState, useRef } from "react";
import "./App.css";
import Habits from "./Habits";
import DateSelector from "./DateSelector";
import DownloadButton from "./DownloadButton";
import Footer from "./Footer";
import FullLayout from "./FullLayout";
import { nanoid } from 'nanoid'

const App = () => {
  const [startMonth, setStartMonth] = useState(new Date().getMonth());
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [monthCount, setMonthCount] = useState(3);
  const [habits, setHabits] = useState([
    { id: nanoid(), text: "Exercise" },
    { id: nanoid(), text: "Meditate" },
    { id: nanoid(), text: "Practice piano" },
    { id: nanoid(), text: "Study chess" },
    { id: nanoid(), text: "Read" },
  ]);

  const refRenderRoot = useRef(null);

  const addHabit = (newHabitText) => {
    setHabits([...habits,
      { id: nanoid(), text: newHabitText }
    ])
  }

  return (
    <div className="app">
      <div className="ui container segment">
        <h1 className="ui center aligned header">
          Habit Tracker - Template Generator
        </h1>
        <h3 className="ui dividing header">Overview</h3>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/search?q=habit+tracker"
          >
            Habit trackers
          </a>{" "}
          offer a way to track and build habits. This tool allows you to
          generate monthly calendar views, print them out, and track your
          habits.
        </p>
        <p>
          While there are numerous apps that help track habits, I've found that
          having a physical sheet of paper is the most effective way for me. I
          print out my habits, put them in a highly visible location that I will
          see daily (e.g. on the kitchen refrigerator), and physically mark an
          "X" with a colored pencil when I complete a task for given day. Having
          a physical list in a visible location means I can't hide from it, and
          the feeling of physically coloring in a square when I finish an
          activity gives me a sense of accomplishment that motivates me to
          continue with the habit.
        </p>
        <p>Good luck!</p>
        <h3 className="ui dividing header">How to Use</h3>
        <ol>
          <li>Add the habits you want to track.</li>
          <li>
            Select the start month/year and the duration you want to track the
            habits.
          </li>
          <li>Download and print the generated PDF.</li>
        </ol>{" "}
        <h3 className="ui dividing header">Configuration</h3>
        <div className="ui grid">
          <div className="eight wide column">
            <Habits
              habits={habits}
              onClickDeleteHabit={(index) =>
                setHabits(habits.filter((_, i) => i !== index))
              }
              onClickAddHabit={(newHabit) => addHabit(newHabit)}
              onClickClearAllHabits={() => setHabits([])}
              onSetHabits={(newHabits) => setHabits(newHabits)}
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
              <DownloadButton 
                disabled={habits.length < 1} 
                refRenderRoot={refRenderRoot} 
              />
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
