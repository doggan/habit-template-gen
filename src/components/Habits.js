import _ from "lodash";
import { useState } from "react";
import "./Habits.css";

const Habits = ({ habits, onClickDeleteHabit, onClickAddHabit }) => {
  const [newHabitText, setNewHabitText] = useState("");

  const onInputChange = (event) => {
    setNewHabitText(event.target.value);
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
      <b>Habits</b>
      <div className="ui aligned divided list">{renderedHabits}</div>
      <div className="ui fluid mini action input">
        <input
          type="text"
          placeholder="Add a habit..."
          onChange={onInputChange}
          value={newHabitText}
        />
        <button
          disabled={!newHabitText}
          onClick={() => {
            onClickAddHabit(newHabitText);

            // Clear input.
            setNewHabitText("");
          }}
          className="ui button"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Habits;
