import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TextInput extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    onChange: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
  }

  static defaultProps = {
    type: 'text'
  }

  render() {
    const { id, type, value, onChange, disabled, placeholder } = this.props;
    const className = classNames('text-input', this.props.className);

    return (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
  }
}

export default TextInput;