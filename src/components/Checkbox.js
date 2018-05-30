import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  render() {
    return (
      <React.Fragment>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={this.props.checked}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <div className="checkbox"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Checkbox;