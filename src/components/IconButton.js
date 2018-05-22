import React from 'react';

import Icon from './Icon';

class IconButton extends React.PureComponent {
  static defaultProps = {
    focusable: true
  };

  render() {
    let className = 'icon-button';
    if (this.props.className) className += ` ${this.props.className}`;
    const tabIndex = this.props.focusable === true ? null : "-1";

    return (
      <button
        className={className}
        onClick={this.props.onClick}
        tabIndex={tabIndex}
        ref={ref => this.button = ref}
      >
        <Icon type={this.props.type}>{this.props.children}</Icon>
      </button>
    );
  }
}

export {
  Icon,
  IconButton as default
};