import _ from "lodash";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Habits.css";

const Habits = ({
  habits,
  onClickDeleteHabit,
  onClickAddHabit,
  onClickClearAllHabits,
  onSetHabits,
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

  const onDragEnd = (result) => {
    const newItems = [...habits];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    onSetHabits(newItems);
  }

  const renderedHabits = _.map(habits, (habit, index) => {
    return (
      <Draggable key={habit.id} draggableId={habit.id} index={index}>
          {(provided, _snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="item destroy-button">
              <div className="right floated content hide">
                <i className="x icon" onClick={() => onClickDeleteHabit(index)}></i>
              </div>
              <div className="content">{habit.text}</div>
            </div>
          )}
      </Draggable>
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, _snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="ui aligned divided list">
                {renderedHabits}
                {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
