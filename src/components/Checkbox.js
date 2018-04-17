import React from 'react';

const Checkbox = (props) => (
  <div className="options-checkbox">
    <label title={props.tooltip}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      <div className="checkbox-wrapper">
        <div className="checkbox"></div>
      </div>
      {props.label}
    </label>
  </div>
);

export default Checkbox;