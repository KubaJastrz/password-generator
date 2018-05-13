import React from 'react';
import PropTypes from 'prop-types';

import InfoBox from './InfoBox';
import Checkbox from './Checkbox';

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
  };

  render() {
    let checkboxSettingsClass = 'checkbox-settings';
    if (!this.props.checked) checkboxSettingsClass += ' hidden';

    return (
      <div className="options-field">
        <label htmlFor={this.props.id}>
          {this.state.checkbox && (
            <Checkbox
              checked={this.props.checked}
              onChange={this.props.onCheckboxChange}
            />
          )}
          <span>{this.props.label}</span>
        </label>

        {this.props.checkboxSettings && (
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