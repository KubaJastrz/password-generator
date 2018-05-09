import React from 'react';
import PropTypes from 'prop-types';

import InfoBox from './InfoBox';

class OptionsField extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,

    infoBox: PropTypes.bool,
    infoBoxText: PropTypes.string,

    // checkbox only
    checked: PropTypes.bool,
    onCheckboxChange: PropTypes.func,

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
    textInput: this.props.type.includes('text')
  };

  componentDidMount() {
    if (this.state.type === 'checkbox') {
      this.container.classList.add('checkbox');
    }
  }

  render() {
    return (
      <div className="options-field" ref={ref => this.container = ref}>
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
              <InfoBox>{this.props.infoBoxText}</InfoBox>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default OptionsField;