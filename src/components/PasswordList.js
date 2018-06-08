import React from 'react';
import { connect } from 'react-redux';

import PasswordListField from './PasswordListField';
import generatePassword from '../app/generatePassword';

import { generatePasswordList } from '../actions/passwords';

const actions = {
  generatePasswordList
};

class PasswordList extends React.PureComponent {
  generatePasswordList = () => {
    const count = this.props.options.list.passwordCount;
    this.props.generatePasswordList(count, this.props.options.password);
  }

  componentDidMount() {
    this.generatePasswordList();
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