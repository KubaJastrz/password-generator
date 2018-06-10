import React from 'react';
import PropTypes from 'prop-types';

import OptionsField from './OptionsField';
import Select from '../Select';

class OptionsSelect extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,

    // select specific
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  render() {
    const labelId = `options-${this.props.id}`;

    return (
      <OptionsField id={this.props.id}>
        <label htmlFor={labelId}>{this.props.label}</label>

        <div className="options-field-select">
          <Select
            id={labelId}
            onChange={this.props.onChange}
            value={this.props.value}
          >
            {this.props.children}
          </Select>
        </div>
      </OptionsField>
    );
  }
}

export default OptionsSelect;