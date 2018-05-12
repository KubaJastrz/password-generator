import React from 'react';

class Select extends React.PureComponent {
  render() {
    return (
      <select
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.props.children}
      </select>
    );
  }
}

class Option extends React.PureComponent {
  render() {
    return (
      <option value={this.props.value}>
        {this.props.children}
      </option>
    );
  }
}

export { Select, Option };