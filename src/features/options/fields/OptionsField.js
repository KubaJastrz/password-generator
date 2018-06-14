import React from 'react';
import classNames from 'classnames';

const OptionsField = ({ children, className }) => {
  className = classNames('options-field', className);
  
  return (
    <div className={className}>
      {children}
    </div>
  );
}
export default OptionsField;