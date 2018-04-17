import React from 'react';

const Input = (props) => (
  <div className="options-input">
    <label>
      {props.label}
      <input
        type={props.type || "text"}
        value={props.value}
        onChange={props.onChange}
        className={props.monospaced ? 'monospace' : ''}
      />
    </label>
  </div>
);

export default Input;