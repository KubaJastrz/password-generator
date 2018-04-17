import React from 'react';
import PropTypes from 'prop-types';

import CopyButton from '../CopyButton';

// TODO: make whole password visible (textarea + button)

class PasswordOutput extends React.Component {
  constructor(props) {
    super(props);
    this.passRef = React.createRef();
  }

  select() {
    this.passRef.current.select();
  }

  render() {
    return (
      <div className="password-output">
        <input
          ref={this.passRef}
          value={this.props.value}
          onClick={this.select.bind(this)}
          readOnly
          autoFocus
        />
        {this.props.copyButton === true && (
          <CopyButton copyRef={this.passRef.current} />
        )}
      </div>
    ); 
  }
}

PasswordOutput.defaultProps = {
  copyButton: false
};

PasswordOutput.propTypes = {
  value: PropTypes.string.isRequired,
  copyButton: PropTypes.bool
};

export default PasswordOutput;