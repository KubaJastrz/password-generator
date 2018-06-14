import React from 'react';
import { connect } from 'react-redux';

import PasswordListField from './PasswordListField';

import { generatePasswordList, setPasswordError } from '~/actions/passwords';

const actions = {
  generatePasswordList,
  setPasswordError
};

class PasswordList extends React.PureComponent {
  generatePasswordList = () => {
    if (this.props.passwords.error != null) {
      this.props.setPasswordError(null);
    }
    const count = this.props.options.list.passwordCount;
    this.props.generatePasswordList(count, this.props.options.password);
  }

  mainKeybinds = (e) => {
    const ctrlKey = e.ctrlKey || e.metaKey;

    // disable in modals
    if (e.target.closest('.modal')) return;

    // disable on every button
    if (e.target.tagName.toLowerCase() === 'button') return;

    // register global ctrl+enter key binding
    if (ctrlKey && (e.code === 'Enter' || e.keyCode === 13)) {
      this.generatePasswordList();
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.mainKeybinds);
    this.generatePasswordList();
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.mainKeybinds);
  }

  render() {
    return (
      <div className="password-list-container">
        <h3 className="password-list-title">Password list:</h3>
        <div className="password-list">
          {this.props.passwords.list.map(field => (
            <PasswordListField
              key={field.name}
              name={field.name}
              value={field.value}
              length={field.length}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  options: state.options,
  passwords: state.passwords
});

export default connect(mapState, actions)(PasswordList);