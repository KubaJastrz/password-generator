import React from 'react';

import PasswordOutput from './PasswordOutput';

const PasswordListField = ({ name, value, length }) => {
  return (
    <div className="password-list-field">
      <div className="header">
        <div className="name">{name}</div>
        <div className="length">{length}</div>
      </div>
      <PasswordOutput value={value} copyButton />
    </div>
  );
};

export default PasswordListField;