import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import OptionsField from './OptionsField';
import TextInput from '~/common/TextInput';
import Tooltip from '~/common/Tooltip';

class OptionsText extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,

    // text specific
    textType: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    onChange: PropTypes.func,
    monospace: PropTypes.bool,
    disabled: PropTypes.bool,

    // tooltip
    tooltip: PropTypes.bool,
    tooltipShow: PropTypes.bool,
    tooltipText: PropTypes.string,
  }

  static defaultProps = {
    textType: 'text'
  }

  render() {
    const labelId = `options-${this.props.id}`;

    const inputContainerClassName = classNames(
      'options-field-input',
      { short: this.props.textType === 'tel' }
    );

    const inputClassName = classNames(
      { monospace: this.props.monospace }
    );

    return (
      <OptionsField id={this.props.id}>
        <label htmlFor={labelId}>{this.props.label}</label>

        <div className={inputContainerClassName}>
          <TextInput
            type={this.props.textType}
            value={this.props.value}
            onChange={this.props.onChange}
            className={inputClassName}
            disabled={this.props.disabled}
            id={labelId}
          />
          {this.props.tooltip && (
            <Tooltip
              show={this.props.tooltipShow}
              text={this.props.tooltipText}
              placement="bottom"
            />
          )}
        </div>
      </OptionsField>
    );
  }
}

export default OptionsText;