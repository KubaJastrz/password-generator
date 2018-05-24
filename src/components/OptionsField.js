import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './Icon';
import IconButton from './IconButton';
import Tooltip from './Tooltip';
import Checkbox from './Checkbox';

class OptionsField extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,

    help: PropTypes.bool,
    helpText: PropTypes.string,
    helpMonospaced: PropTypes.bool,

    tooltip: PropTypes.bool,
    tooltipShow: PropTypes.bool,
    tooltipText: PropTypes.string,
    tooltipDirection: PropTypes.string,

    // checkbox only
    checked: PropTypes.bool,
    onCheckboxChange: PropTypes.func,

    // checkbox settings only
    checkboxSettings: PropTypes.bool,
    checkboxSettingsValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onCheckboxSettingsValueChange: PropTypes.func,

    // input text only
    textValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onTextChange: PropTypes.func,
    textType: PropTypes.string,
    textMonospaced: PropTypes.bool,
    textDisabled: PropTypes.bool
  };

  state = {
    type: this.props.type,
    checkbox: this.props.type.includes('checkbox'),
    textInput: this.props.type.includes('text'),
    showHelp: false,
  };

  showHelp = () => {
    this.setState({ showHelp: true });
  };

  hideHelp = () => {
    this.setState({ showHelp: false });
  };

  render() {
    const checkboxSettingsClass = classNames(
      'options-field-settings',
      { hidden: !this.props.checked }
    );

    return (
      <div className="options-field">
        <label
          htmlFor={this.props.id}
          onMouseOver={this.showHelp}
          onMouseOut={this.hideHelp}
        >
          {this.state.checkbox && (
            <Checkbox
              checked={this.props.checked}
              onChange={this.props.onCheckboxChange}
            />
          )}
          <span>{this.props.label}</span>

          {this.props.help === true && (
            <div className="options-field-help">
              <Icon>?</Icon>
              <Tooltip
                placement="right"
                show={this.state.showHelp}
                monospaced={this.props.helpMonospaced}
              >
                {this.props.helpText}
              </Tooltip>
            </div>
          )}
        </label>

        {this.props.checkboxSettings === true && (
          <div className={checkboxSettingsClass}>
            (<span>at least</span>
            <input
              type="tel"
              value={this.props.checkboxSettingsValue}
              onChange={this.props.onCheckboxSettingsValueChange}
            />
            )
          </div>
        )}

        {this.state.textInput === true && (
          <div className="options-field-input">
            <input
              type={this.props.textType || "text"}
              value={this.props.textValue}
              onChange={this.props.onTextChange}
              className={this.props.textMonospaced ? 'monospace' : ''}
              disabled={this.props.textDisabled}
              id={this.props.id}
            />
            {this.props.tooltip && (
              <Tooltip 
                show={this.props.tooltipShow}
                direction={this.props.tooltipDirection}
              >
                {this.props.tooltipText}
              </Tooltip>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default OptionsField;