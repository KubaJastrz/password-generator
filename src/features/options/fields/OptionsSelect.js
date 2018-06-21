import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '~/common/IconButton';
import OptionsField from './OptionsField';
import Select from '~/common/Select';

class OptionsSelect extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,

    // select specific
    value: PropTypes.string,
    onChange: PropTypes.func,

    // icon
    iconType: PropTypes.string,
    iconClick: PropTypes.func
  }

  render() {
    const { iconType, iconClick, id, label, ...selectProps } = this.props;
    
    const labelId = `options-${id}`;

    return (
      <OptionsField id={id}>
        <label htmlFor={labelId}>{label}</label>

        <div className="options-field-select">
          <Select
            id={labelId}
            {...selectProps}
          />
          <IconButton
            type={iconType}
            onClick={iconClick}
          />
        </div>
      </OptionsField>
    );
  }
}

export default OptionsSelect;