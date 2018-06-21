import React from 'react';
import ReactSelect from 'react-select';

import Icon from '~/common/Icon';

const arrow = ({ onMouseDown, isOpen }) => {
  return (
    <Icon type="chevron-down" />
  );
};

class Select extends React.PureComponent {
  render() {
    const { options, ...props } = this.props;

    return (
      <ReactSelect
        options={options}
        {...props}

        arrowRenderer={arrow}
        clearable={false}
        searchable={false}
      />
    );
  }
}

export default Select;