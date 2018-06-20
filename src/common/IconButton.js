import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './Icon';

class IconButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string
  };

  render() {
    const { className, children, type, ...props } = this.props;
    const css = classNames('icon-button', className);

    return (
      <button
        className={css}
        {...props}
        ref={ref => this.button = ref}
      >
        <Icon type={type}>{children}</Icon>
      </button>
    );
  }
}

export default IconButton;