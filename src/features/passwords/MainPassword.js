import React from 'react';
import { connect } from 'react-redux';

import { selectText } from '~/utils/dom';
import { shuffleArray } from '~/utils/lang';

import Button from '~/common/Button';
import CopyButton from '~/common/CopyButton';
import PasswordOutput from '~/common/PasswordOutput';

import { generateMainPassword, setPasswordError } from '~/actions/passwords';

const actions = {
  generateMainPassword,
  setPasswordError
};

class MainPassword extends React.Component {
  state = {
    showCopiedTooltip: false
  }

  generatePassword = () => {
    if (this.props.passwords.error != null) {
      this.props.setPasswordError(null);
    }
    this.props.generateMainPassword(this.props.options.password);
  }

  mainKeybinds = (e) => {
    const { target, code, keyCode } = e;
    const ctrlKey = e.ctrlKey || e.metaKey;

    // disable in modals
    if (target.closest('.modal')) return;

    // disable on every button
    if (target.tagName.toLowerCase() === 'button') return;

    // register global enter key binding
    if (!ctrlKey && (code === 'Enter' || keyCode === 13)) {
      this.generatePassword();
    }
  }

  copyKeybinds = (e) => {
    const { target, code, keyCode } = e;
    const ctrlKey = e.ctrlKey || e.metaKey;
    const copyTarget = this.outputElement;

    // disable in modals
    if (target.closest('.modal')) return;

    // disable on inputs
    if (target.tagName.toLowerCase() === 'input') return;

    // disable on .output-field
    if (
      target.closest('.output-field') &&
      !target.closest('.main-password-container')
    ) return;

    // register global ctrl+c key binding
    if (ctrlKey && (code === 'KeyC' || keyCode === 67)) {
      if (copyTarget.parentNode.contains(target)) {
        copyTarget.focus();
        selectText(copyTarget);
        document.execCommand('copy');
        this.showCopiedTooltip();
      }
    }
  }

  showCopiedTooltip = () => {
    this.setState({ showCopiedTooltip: true }, () => {
      setTimeout(() => {
        this.setState({ showCopiedTooltip: false });
      }, 2000);
    });
  }

  shuffleCharacters = () => {
    let value = this.outputElement.textContent;

    value = shuffleArray(value.split('')).join('');

    this.outputElement.textContent = value;
  }

  componentDidMount() {
    this.outputElement = this.outputRef.passRef;
    document.body.addEventListener('keydown', this.mainKeybinds);
    document.body.addEventListener('keydown', this.copyKeybinds);
    this.generatePassword();
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.mainKeybinds);
    document.body.removeEventListener('keydown', this.copyKeybinds);
  }

  render() {
    return (
      <div className="main-password-container">
        <PasswordOutput
          ref={ref => this.outputRef = ref}
          value={this.props.passwords.main}
          variant="big"
          allowExpand
          copyButton
          showCopiedTooltip={this.state.showCopiedTooltip}
          focusOnMount
          fontsLoaded={this.props.fonts.fontsLoaded}
        />
        <div className="main-password-buttons">
          <Button
            onClick={this.shuffleCharacters}
            className="shuffle-button"
          >
            shuffle characters
          </Button>
          <Button
            onClick={this.generatePassword}
            className="reset-button"
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