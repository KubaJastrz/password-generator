import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TextInput extends React.PureComponent {
  static defaultProps = {
    type: 'text'
  }

  render() {
    const { className, ...props } = this.props;
    const css = classNames('text-input', className);

    return (
      <input
        className={css}
        {...props}
      />
    );
  }
}

export default TextInput;