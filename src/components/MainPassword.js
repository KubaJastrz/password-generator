import React from 'react';
import { connect } from 'react-redux';

import { selectText } from '../utils/dom';

import PasswordOutput from './PasswordOutput';
import CopyButton from './CopyButton';
import generatePassword from '../lib/generatePassword';

import { setErrorMessage } from '../actions/options';

class MainPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ''
    };
    
    this.generatePassword = this.generatePassword.bind(this);
    this.mainKeybinds = this.mainKeybinds.bind(this);
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
        if (typeof err === 'string') {
          this.props.dispatch(setErrorMessage(err));
        } else {
          console.error(err);
        }
      });
  }

  mainKeybinds(e) {
    const ctrlKey = e.ctrlKey || e.metaKey;

    // disable in React Modal
    if (e.target.closest('.ReactModal')) return;

    // disable on every button
    if (e.target.tagName.toLowerCase() === 'button') return;

    // register global enter key binding
    if (e.code === 'Enter' || e.keyCode === 13) {
      this.generatePassword();
    }

    // disable on input (which is not readonly)
    if (e.target.tagName.toLowerCase() === 'input' && !e.target.readOnly) {
      return;
    }

    // register global ctrl+c key binding
    if (ctrlKey && (e.code === 'KeyC' || e.keyCode === 67)) {
      selectText(this.outputElement);
      document.execCommand('copy');
    }
  }

  componentDidMount() {
    this.outputElement = this.outputRef.passRef;
    document.body.addEventListener('keydown', this.mainKeybinds);
    this.generatePassword();
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.mainKeybinds);
  }

  render() {
    return (
      <div className="main-password-container">
        <PasswordOutput
          ref={ref => this.outputRef = ref}
          value={this.state.password}
          copyButton={true}
          expandButton={true}
          fontsLoaded={this.props.fonts.fontsLoaded}
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
  options: state.options,
  fonts: state.fonts
});

export default connect(mapState)(MainPassword);