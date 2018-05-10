import React from 'react';
import PropTypes from 'prop-types';

class InfoBox extends React.PureComponent {
  static propTypes = {
    // show: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    direction: PropTypes.string
  };

  static defaultProps = {
    type: 'info',
    direction: 'up'
  };

  state = {
    show: false
  };

  componentDidUpdate(prevProps) {
    const { children } = this.props;

    if (children !== prevProps.children && typeof children === 'string') {
      if (children.length > 0 && !this.state.show) {
        this.setState({ show: true });
      }
      else if (children.length === 0 && this.state.show) {
        this.setState({ show: false });
      }
    }
  }

  render() {
    const classNames = `info-box ${this.props.type} ${this.props.direction}`;
    return (
      <React.Fragment>
      {this.state.show && (
        <div className={classNames}>
          {this.props.children}
        </div>
      )}
      </React.Fragment>
    );
  }
}

export default InfoBox;