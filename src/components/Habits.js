import _ from "lodash";
import { useState } from "react";
import "./Habits.css";

const Habits = ({
  habits,
  onClickDeleteHabit,
  onClickAddHabit,
  onClickClearAllHabits,
}) => {
  const [newHabitText, setNewHabitText] = useState("");

  const onInputChange = (event) => {
    setNewHabitText(event.target.value);
  };

  const onInputKeyPress = (event) => {
    if (event.key === "Enter" && newHabitText) {
      addNewHabit();
    }
  };

  const addNewHabit = () => {
    onClickAddHabit(newHabitText);

    // Clear input.
    setNewHabitText("");
  };

  const renderedHabits = _.map(habits, (habit, index) => {
    return (
      <div key={index} className="item destroy-button">
        <div className="right floated content hide">
          <i className="x icon " onClick={() => onClickDeleteHabit(index)}></i>
        </div>
        <div className="content">{habit}</div>
      </div>
    );
  });

  return (
    <div>
      <b>
        Habits{" "}
        <small>
          <a
            onClick={(e) => {
              e.preventDefault();
              onClickClearAllHabits();
            }}
            href="."
          >
            (clear all)
          </a>
        </small>
      </b>

      <div className="ui aligned divided list">{renderedHabits}</div>
      <div className="ui fluid small action input">
        <input
          type="text"
          placeholder="Add a habit..."
          onChange={onInputChange}
          onKeyPress={onInputKeyPress}
          value={newHabitText}
        />
        <button
          disabled={!newHabitText}
          onClick={() => addNewHabit()}
          className="ui button"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Habits;
