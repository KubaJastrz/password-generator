import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './Icon';

class IconButton extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    tabIndex: PropTypes.string,
    type: PropTypes.string
  };

  render() {
    const className = classNames('icon-button', this.props.className);

    return (
      <button
        className={className}
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        tabIndex={this.props.tabIndex}
        ref={ref => this.button = ref}
      >
        <Icon type={this.props.type}>{this.props.children}</Icon>
      </button>
    );
  }
}

export default IconButton;