import React from 'react';
import { connect } from 'react-redux';

import { selectText } from '../../utils';

import PasswordOutput from '../../components/PasswordOutput';
import CopyButton from '../../components/CopyButton';
import generatePassword from '../../lib/generatePassword';

import { setErrorMessage } from './actions';

class MainPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
    
    this.generatePassword = this.generatePassword.bind(this);
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
      if (e.target.tagName.toLowerCase() === 'button') {
        return;
      }
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
        selectText(this.outputElement);
        // no need for document.execCommand('copy')
      }
    });
  }

  componentDidMount() {
    this.outputElement = this.outputRef.passRef;
    this.registerGlobalShortcuts();
    this.generatePassword();
  }

  render() {
    return (
      <div className="main-password-container">
        <PasswordOutput
          ref={ref => this.outputRef = ref}
          value={this.state.value}
          copyButton={true}
          expandButton={true}
        />
        <button
          onClick={this.generatePassword}
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