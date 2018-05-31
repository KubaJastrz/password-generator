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

  static defaultProps = {
    id: null,
  };

  constructor(props) {
    super();

    this.state = {
      showHelp: false,
      helpFocused: false,
      checkbox: props.type.includes('checkbox'),
      textInput: props.type.includes('text')
    };

    this.onHelpFocus = this.onHelpFocus.bind(this);
    this.onHelpBlur = this.onHelpBlur.bind(this);
    this.onHelpMouseOut = this.onHelpMouseOut.bind(this);
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
  }

  onHelpFocus(e) {
    this.setState({ helpFocused: true, showHelp: true });
  }

  onHelpBlur(e) {
    this.setState({ helpFocused: false, showHelp: false });
  }

  onHelpMouseOut(e) {
    if (!this.state.helpFocused) {
      this.hideHelp();
    }
  }

  showHelp() {
    this.setState({ showHelp: true });
  }

  hideHelp() {
    this.setState({ showHelp: false });
  }

  render() {
    const textInputClass = classNames(
      'options-field-input',
      { short: this.props.textType === 'tel' }
    );
    const checkboxSettingsClass = classNames(
      'options-field-settings',
      { hidden: !this.props.checked }
    );

    return (
      <div className="options-field">
        <label
          htmlFor={this.props.id}
          onMouseOver={this.showHelp}
          onMouseOut={this.onHelpMouseOut}
        >
          {this.state.checkbox && (
            <Checkbox
              checked={this.props.checked}
              onChange={this.props.onCheckboxChange}
              onFocus={this.onHelpFocus}
              onBlur={this.onHelpBlur}
            />
          )}
          <span>{this.props.label}</span>
        </label>

        {this.props.help === true && (
          <div className="options-field-help">
            <IconButton
              tabIndex="-1"
              className="help-icon"
              onFocus={this.onHelpFocus}
              onBlur={this.onHelpBlur}
              onMouseOver={this.showHelp}
              onMouseOut={this.onHelpMouseOut}
            >
              ?
            </IconButton>
            <Tooltip
              show={this.state.showHelp}
              text={this.props.helpText}
              placement="right"
              monospaced={this.props.helpMonospaced}
            />
          </div>
        )}

        {this.props.checkboxSettings === true && (
          <div className={checkboxSettingsClass}>
            (at least
            <div className="options-field-settings-input">
              <input
                type="tel"
                value={this.props.checkboxSettingsValue}
                onChange={this.props.onCheckboxSettingsValueChange}
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
        )}

        {this.state.textInput === true && (
          <div className={textInputClass}>
            <input
              type={this.props.textType || 'text'}
              value={this.props.textValue}
              onChange={this.props.onTextChange}
              className={this.props.textMonospaced ? 'monospace' : ''}
              disabled={this.props.textDisabled}
              id={this.props.id}
            />
            {this.props.tooltip && (
              <Tooltip
                show={this.props.tooltipShow}
                text={this.props.tooltipText}
                placement="bottom"
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default OptionsField;