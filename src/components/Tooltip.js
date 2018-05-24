import React from 'react';
import PropTypes from 'prop-types';

class Tooltip extends React.PureComponent {
  static propTypes = {
    // show: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    direction: PropTypes.string
  };

  static defaultProps = {
    type: 'info',
    direction: 'up'
  };

  constructor(props) {
    super();

    const show = props.show != null ? props.show : false;

    this.state = {
      show
    };
  }

  componentDidUpdate(prevProps) {
    const { children, show } = this.props;

    if (show !== prevProps.show) {
      this.setState({ show });
    }

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
    const classNames = `tooltip ${this.props.type} ${this.props.direction}`;
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

export default Tooltip;