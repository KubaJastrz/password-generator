import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Checkbox extends React.PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string
  };

  render() {
    const { type, ...props } = this.props;
    const className = classNames('checkbox-wrapper', type);
    
    return (
      <React.Fragment>
        <div className={className}>
          <input
            type="checkbox"
            {...props}
            ref={ref => this.checkbox = ref}
          />
          <div className="checkbox" />
        </div>
      </React.Fragment>
    );
  }
}

export default Checkbox;