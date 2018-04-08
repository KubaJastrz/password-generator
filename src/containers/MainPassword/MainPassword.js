import React from 'react';
import { connect } from 'react-redux';

import { PasswordOutput, generatePassword } from '../../components/Password';
import CopyButton from '../../components/CopyButton';

import { setErrorMessage } from './actions';

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
      if (this.props.options.errorMessage) {
        this.props.dispatch(setErrorMessage(''));
      }
    } else {
      this.props.dispatch(setErrorMessage(password.value));
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