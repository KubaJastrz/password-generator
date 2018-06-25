import React from 'react';
import ReactSelect from 'react-select';
import classNames from 'classnames';

import Icon from '~/common/Icon';

const arrow = ({ onMouseDown, isOpen }) => {
  return (
    <Icon type="chevron-down" />
  );
};

class Select extends React.PureComponent {
  render() {
    const { className, useNative, ...props } = this.props;
    const css = classNames('select', className);

    if (useNative) {
      return <select className={css} {...props} />;
    }

    return (
      <ReactSelect
        {...props}

        arrowRenderer={arrow}
        clearable={false}
        searchable={false}
        className={css}
      />
    );
  }
}

export default Select;