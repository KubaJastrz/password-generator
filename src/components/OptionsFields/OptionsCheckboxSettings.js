import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import OptionsCheckbox from './OptionsCheckbox';
import Tooltip from '../Tooltip';

class OptionsCheckboxSettings extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,

    // checkbox specific
    checked: PropTypes.bool,
    onCheckboxChange: PropTypes.func,

    // checkbox settings specific
    textValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onTextChange: PropTypes.func,

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
      'options-field-settings',
      { hidden: !this.props.checked }
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
          (at least
          <div className="options-field-settings-input">
            <input
              type="tel"
              value={this.props.textValue}
              onChange={this.props.onTextChange}
            />
            {this.props.tooltip && (
              <Tooltip
                show={this.props.tooltipShow}
                text={this.props.tooltipText}
                placement="bottom"
              />
            )}
          </div>
          )
        </div>
      </OptionsCheckbox>
    );
  }
}

export default OptionsCheckboxSettings;