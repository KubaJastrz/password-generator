import React from 'react';
import PropTypes from 'prop-types';

export default class OptionsField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      checkbox: this.props.type.includes('checkbox'),
      textInput: this.props.type.includes('text')
    };
  }

  componentDidMount() {
    if (this.state.type === 'checkbox') {
      this.container.classList.add('checkbox');
    }
  }

  render() {
    return (
      <div className="options-field" ref={ref => this.container = ref}>
        <label>
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
          {this.state.textInput && (
            <input
              type={this.props.textType || "text"}
              value={this.props.value}
              onChange={this.props.onTextChange}
              className={this.props.textMonospaced ? 'monospace' : ''}
              disabled={this.props.textDisabled}
            />
          )}
        </label>
      </div>
    );
  }
}

OptionsField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,

  // checkbox only
  checked: PropTypes.bool,
  onCheckboxChange: PropTypes.func,

  // input text only
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onTextChange: PropTypes.func,
  textType: PropTypes.string,
  textMonospaced: PropTypes.bool,
  textDisabled: PropTypes.bool
};