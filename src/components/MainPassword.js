import React from 'react';
import { connect } from 'react-redux';

import { selectText } from '../utils/dom';
import { shuffleArray } from '../utils/lang';

import Button from './Button';
import CopyButton from './CopyButton';
import PasswordOutput from './PasswordOutput';
import generatePassword from '../app/generatePassword';

import { generateMainPassword } from '../actions/passwords';

const actions = {
  generateMainPassword
};

class MainPassword extends React.Component {
  generatePassword = () => {
    this.props.generateMainPassword(this.props.options);
  }

  mainKeybinds = (e) => {
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

  shuffleCharacters = () => {
    let value = this.outputElement.textContent;

    value = shuffleArray(value.split('')).join('');

    this.outputElement.textContent = value;
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
          value={this.props.passwords.main}
          copyButton={true}
          expandButton={true}
          fontsLoaded={this.props.fonts.fontsLoaded}
          variant="big"
          focusOnMount
        />
        <div className="main-password-buttons">
          <Button
            onClick={this.shuffleCharacters}
            className="shuffle-button"
            tabIndex="-1"
          >
            shuffle characters
          </Button>
          <Button
            onClick={this.generatePassword}
            className="reset-button"
            tabIndex="-1"
          >
            get new one
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  fonts: state.fonts,
  options: state.options,
  passwords: state.passwords
});

export default connect(mapState, actions)(MainPassword);