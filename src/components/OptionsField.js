import React from 'react';
import PropTypes from 'prop-types';

import InfoBox from './InfoBox';
import { Select, Option } from './Select';

class OptionsField extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,

    infoBox: PropTypes.bool,
    infoBoxText: PropTypes.string,
    infoBoxDirection: PropTypes.string,

    // checkbox only
    checked: PropTypes.bool,
    onCheckboxChange: PropTypes.func,

    // checkbox settings only
    checkboxSettings: PropTypes.bool,
    checkboxSettingsSelect: PropTypes.string,
    checkboxSettingsValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onCheckboxSettingsSelectChange: PropTypes.func,
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
  };

  render() {
    let checkboxSettingsClass = 'checkbox-settings';
    if (!this.props.checked) checkboxSettingsClass += ' hidden';

    return (
      <div className="options-field">
        <label htmlFor={this.props.id}>
          {this.state.checkbox && (
            <React.Fragment>
              <input
                type="checkbox"
                checked={this.props.checked}
                onChange={this.props.onCheckboxChange}
              />
              <div className="checkbox-wrapper">
                <div className="checkbox"></div>
              </div>
            </React.Fragment>
          )}
          <span>{this.props.label}</span>
        </label>
        {this.props.checkboxSettings && (
          <div className={checkboxSettingsClass}>
            <Select
              value={this.props.checkboxSettingsSelect}
              onChange={this.props.onCheckboxSettingsSelectChange}
            >
              <Option value="less">less than</Option>
              <Option value="equal">equal to</Option>
              <Option value="more">more than</Option>
            </Select>
            <input
              type="tel"
              value={this.props.checkboxSettingsValue}
              onChange={this.props.onCheckboxSettingsValueChange}
            />
          </div>
        )}
        {this.state.textInput && (
          <div className="input-wrapper">
            <input
              type={this.props.textType || "text"}
              value={this.props.textValue}
              onChange={this.props.onTextChange}
              className={this.props.textMonospaced ? 'monospace' : ''}
              disabled={this.props.textDisabled}
              id={this.props.id}
            />
            {this.props.infoBox && (
              <InfoBox direction={this.props.infoBoxDirection}>
                {this.props.infoBoxText}
              </InfoBox>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default OptionsField;