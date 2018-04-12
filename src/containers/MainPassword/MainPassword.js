import React from 'react';
import { connect } from 'react-redux';

import { PasswordOutput, generatePassword } from '../../components/Password';
import CopyButton from '../../components/CopyButton';

import { setErrorMessage } from './actions';

class MainPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.outputRef = React.createRef();
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

  registerGlobalShortcuts() {
    document.body.addEventListener('keydown', (e) => {
      // keyCode only to support older browsers
      if (e.code === 'Enter' || e.keyCode === 13) {
        this.generatePassword();
      }
      if (e.target.tagName.toLowerCase() === 'input' && !e.target.readOnly) {
        return;
      }
      if (e.code === 'Space' || e.keyCode === 32) {
        this.generatePassword();
      }
      if (e.ctrlKey && (e.code === 'KeyC' || e.keyCode === 67)) {
        this.outputRef.current.passRef.current.select()
        // no need for document.execCommand('copy')
      }
    });
  }

  componentDidMount() {
    this.registerGlobalShortcuts();
    this.generatePassword();
  }

  render() {
    return (
      <div className="main-password-container">
        <PasswordOutput
          ref={this.outputRef}
          value={this.state.value}
          copyButton={true}
        />
        <button
          onClick={this.generatePassword.bind(this)}
          className="reset-button"
          tabIndex="-1"
        >
          get new one
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  options: state.options
});

export default connect(mapState)(MainPassword);