import React from 'react';
import classNames from 'classnames';

class Button extends React.PureComponent {
  render() {
    const { children, className, type, ...props } = this.props;
    const css = classNames('button', className, type);
  
    return (
      <button className={css} {...props}>{children}</button>
    );
  }
}

export default Button;