import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';
import IconButton from '../IconButton';
import OptionsField from './OptionsField';
import Tooltip from '../Tooltip';

class OptionsCheckbox extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,

    // help
    help: PropTypes.bool,
    helpShow: PropTypes.bool,
    helpText: PropTypes.string,
    helpMonospaced: PropTypes.bool,

    // checkbox specific
    checked: PropTypes.bool,
    onChange: PropTypes.func,

    children: PropTypes.node
  }

  state = {
    helpFocused: false,
    showHelp: false
  }

  onCheckboxFocus = (e) => {
    const { checkbox } = this.checkboxRef;
    // hack around virtual dom (issue with focus-visible polyfill + react)
    setTimeout(() => {
      const keyDown = checkbox.classList.contains('focus-visible');
      if (keyDown) {
        this.setState({ helpFocused: true, showHelp: true });
      }
    });
  }

  onHelpFocus = (e) => {
    this.setState({ helpFocused: true, showHelp: true });
  }

  onHelpBlur = (e) => {
    this.setState({ helpFocused: false, showHelp: false });
  }

  onHelpMouseOut = (e) => {
    if (!this.state.helpFocused) {
      this.hideHelp();
    }
  }

  showHelp = () => {
    this.setState({ showHelp: true });
  }

  hideHelp = () => {
    this.setState({ showHelp: false });
  }

  render() {
    const labelId = `options-${this.props.id}`;

    return (
      <OptionsField>
        <label
          onMouseOver={this.showHelp}
          onMouseOut={this.onHelpMouseOut}
        >
          <Checkbox
            checked={this.props.checked}
            onChange={this.props.onChange}
            onFocus={this.onCheckboxFocus}
            onBlur={this.onHelpBlur}
            ref={ref => this.checkboxRef = ref}
          />
          <span>{this.props.label}</span>
        </label>

        {this.props.help && (
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

        {this.props.children}
      </OptionsField>
    );
  }
}

export default OptionsCheckbox;