import React from "react";

const Inputfield = ({handleChange, title, value, name}) => {
  return (
    <>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name={name}
            value={value}
            onChange={handleChange}
          />
          <span className="checkmark"></span>{title}
        </label>
      </div>
    </>
  );
};

export default Inputfield;
