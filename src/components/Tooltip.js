import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Tooltip extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    placement: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
    monospaced: PropTypes.bool,
  };

  static defaultProps = {
    show: false,
    type: 'info',
    placement: 'bottom'
  };

  render() {
    const className = classNames(
      'tooltip',
      { active: this.props.show },
      this.props.type,
      this.props.placement,
      { monospace: this.props.monospaced }
    );

    return (
      <div className={className}>
        {this.props.text}
      </div>
    );
  }
}

export default Tooltip;