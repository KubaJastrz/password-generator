import React from 'react';
import classNames from 'classnames';

class Button extends React.PureComponent {
  render() {
    const { onClick, children } = this.props;
    const className = classNames(
      'button',
      this.props.className,
      this.props.type
    );
  
    return (
      <button
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

export default Button;