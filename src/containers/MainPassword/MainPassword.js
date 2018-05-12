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
      password: ''
    };
    
    this.generatePassword = this.generatePassword.bind(this);
  }

  generatePassword() {
    if (this.props.options.errorMessage) {
      this.props.dispatch(setErrorMessage(''));
    }

    generatePassword(this.props.options)
      .then(password => {
        this.setState({ password });
      })
      .catch(err => {
        err = err.toString().replace('Error: ', '');
        this.props.dispatch(setErrorMessage(err));
      });
  }

  registerGlobalShortcuts() {
    document.body.addEventListener('keydown', (e) => {
      const ctrlKey = e.ctrlKey || e.metaKey;

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
      if (ctrlKey && (e.code === 'KeyC' || e.keyCode === 67)) {
        selectText(this.outputElement);
        document.execCommand('copy');
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
          value={this.state.password}
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