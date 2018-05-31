import React from 'react';
import PropTypes from 'prop-types';

import Icon from './Icon';
import IconButton from './IconButton';

class AppNotification extends React.PureComponent {
  static defaultProps = {
    icon: 'info'
  };

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    icon: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div className="app-notification">
        <Icon type="info-outline" />
        <span>{this.props.children}</span>
        <IconButton type="close" onClick={this.props.onClose} />
      </div>
    );
  }
}

export default AppNotification;