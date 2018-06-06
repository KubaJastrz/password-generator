import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import OptionsCheckbox from './OptionsCheckbox';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';

class OptionsCheckboxText extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,

    // checkbox specific
    checked: PropTypes.bool,
    onCheckboxChange: PropTypes.func,

    // text specific
    textValue: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    onTextChange: PropTypes.func,
    textType: PropTypes.string,
    textMonospace: PropTypes.bool,
    textDisabled: PropTypes.bool,

    // help
    help: PropTypes.bool,
    helpText: PropTypes.string,

    // tooltip
    tooltip: PropTypes.bool,
    tooltipShow: PropTypes.bool,
    tooltipText: PropTypes.string,
  }

  static defaultProps = {
    textType: 'text'
  }

  render() {
    const inputContainerClassName = classNames(
      'options-field-input',
      { short: this.props.textType === 'tel' }
    );

    const inputClassName = classNames(
      { monospace: this.props.textMonospace }
    );

    return (
      <OptionsCheckbox
        id={this.props.id}
        label={this.props.label}
        checked={this.props.checked}
        onChange={this.props.onCheckboxChange}
        help={this.props.help}
        helpText={this.props.helpText}
      >
        <div className={inputContainerClassName}>
          <TextInput
            type={this.props.textType}
            value={this.props.textValue}
            onChange={this.props.onTextChange}
            className={inputClassName}
            disabled={this.props.textDisabled}
          />
          {this.props.tooltip && (
            <Tooltip
              show={this.props.tooltipShow}
              text={this.props.tooltipText}
              placement="bottom"
            />
          )}
        </div>
      </OptionsCheckbox>
    );
  }
}

export default OptionsCheckboxText;