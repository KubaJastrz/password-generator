import React from 'react';

const Checkbox = (props) => (
  <div>
    <label title={props.tooltip}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      {props.label}
    </label>
  </div>
);

export default Checkbox;