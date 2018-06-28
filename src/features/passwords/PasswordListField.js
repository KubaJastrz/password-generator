import React from 'react';

import PasswordOutput from '~/common/PasswordOutput';

import { selectText } from '~/utils/dom';

class PasswordListField extends React.PureComponent {
  state = {
    showCopiedTooltip: false
  }

  keybinds = (e) => {
    const { target, code, keyCode } = e;
    const ctrlKey = e.ctrlKey || e.metaKey;
    const copyTarget = this.outputElement.passRef;

    // disable in modals
    if (target.closest('.modal')) return;

    // disable on inputs
    if (target.tagName.toLowerCase() === 'input') return;

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

  componentDidMount() {
    document.body.addEventListener('keydown', this.keybinds);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.keybinds);
  }

  render() {
    const { name, value, length } = this.props;

    return (
      <div className="password-list-field">
        <div className="header">
          <div className="name">{name}</div>
          <div className="length" title="custom field length">{length}</div>
        </div>
        <PasswordOutput
          ref={n => this.outputElement = n}
          value={value}
          copyButton
          showCopiedTooltip={this.state.showCopiedTooltip}
        />
      </div>
    );
  }
}

export default PasswordListField;