import React from 'react';
import { connect } from 'react-redux';

import { PasswordOutput, generatePassword } from './Password';
import CopyButton from './CopyButton';

class MainPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      outputRef: null
    };
  }

  generatePassword() {
    const password = generatePassword(this.props.options);
    
    // console.log(password)

    if (password.ok) {
      this.setState({
        value: password.value
      });
    } else {
      this.props.dispatch({
        type: 'OPTIONS_ERROR',
        payload: password.value
      });
    }
  }

  componentDidMount() {
    this.setState({
      outputRef: this.outputRef
    });

    this.generatePassword();
  }

  render() {
    return (
      <div className="main-password-container">
        <PasswordOutput
          value={this.state.value}
          passRef={ref => this.outputRef = ref}
        />
        <button onClick={this.generatePassword.bind(this)}>reset</button>
        <CopyButton copyRef={this.state.outputRef} />
      </div>
    );
  }
}

const mapState = (state) => ({
  options: state.options
});

export default connect(mapState)(MainPassword);