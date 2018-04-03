import React from 'react';

const PasswordOutput = (props) => (
  <input
    ref={props.passRef}
    value={props.value}
    readOnly
    className="password-output"
  />
);

export default PasswordOutput;