import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      // Only attempt to 'close' the dropdown if the clicked
      // target is not part of this Dropdown component.
      // The component itself already handles open/closed state
      // so we don't want to interfere with this.
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    const isSelected = option.value === selected.value;
    const getRenderedLabel = (label) => {
      return isSelected ? <b>{label}</b> : label;
    };

    return (
      <div
        key={option.value}
        className={"item " + (isSelected ? "selected" : "")}
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {getRenderedLabel(option.label)}
      </div>
    );
  });

  return (
    <div className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          ref={ref}
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
