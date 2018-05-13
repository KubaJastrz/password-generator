import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    return (
      <React.Fragment>
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <div className="checkbox-wrapper">
          <div className="checkbox"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default Checkbox;