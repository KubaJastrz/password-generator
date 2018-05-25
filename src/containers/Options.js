import React from 'react';
import { connect } from 'react-redux';

import OptionsField from '../components/OptionsField';
import { setOptionsFields } from '../actions/options';
import { setTooltipText } from '../actions/tooltip';

import LocalStorage from '../lib/LocalStorage';
import { defaultOptions } from '../lib/generatePassword';
import { deepClone } from '../utils/lang';

class Options extends React.Component {
  constructor(props) {
    super();

    const includeChecked = LocalStorage.get('includeChecked') != null
      ? LocalStorage.get('includeChecked')
      : true;
    
    this.state = {
      options: deepClone(props.options),
      includeChecked,
      unlimitedLength: false
    };

    this.onIncludeCheckboxChange = this.onIncludeCheckboxChange.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.setTooltip = this.setTooltip.bind(this);
  }

  onCheckboxChange(e, id, withSettings = false) {
    const { checked } = e.target;

    this.setState(prevState => {
      if (withSettings) prevState.options[id].checked = checked;
      else prevState.options[id] = checked;

      return prevState;
    }, this.updateOptions);
  }

  onIncludeCheckboxChange() {
    this.setState(prevState => ({
      includeChecked: !prevState.includeChecked
    }), () => {
      this.updateOptions();
      LocalStorage.set('includeChecked', this.state.includeChecked);
    });
  }

  onCheckboxSettingsChange(e, id) {
    const { value } = e.target;

    this.setState(prevState => {
      prevState.options[id].min = value;
      return prevState;
    }, () => {
      if (value.match(/^\d+$/)) {
        if (this.props.tooltips[id].show === true) {
          this.setTooltip(id, '');
        }
        if (Number(value) !== this.props.options[id].min) {
          this.updateOptions();
        }
      } else if (value.length === 0) {
        this.setTooltip(id, 'must be greater or equal to 0');
      } else {
        this.setTooltip(id, 'only numbers allowed');
      }
    });
  }

  onTextInputChange(e, id, numeric = false) {
    const { value } = e.target;

    this.setState(prevState => {
      prevState.options[id] = value;
      return prevState;
    }, () => {
      if (numeric) {
        if (value.match(/^\d*$/)) {
          if (id === 'length') {
            try {
              this.parseLength(value);
            }
            catch (err) {
              this.setTooltip(id, err);
              this.props.dispatch(setOptionsFields({
                length: defaultOptions.length
              }));
              return;
            }
          }

          if (this.props.tooltips[id].show === true) {
            this.setTooltip(id, '');
          }

          if (Number(value) !== this.props.options[id]) {
            this.updateOptions();
          }
        } else {
          this.setTooltip(id, 'only numbers allowed');
        }
      }
    });
  }

  parseLength(value) {
    if (value < 1) {
      throw 'must be greater than 0';
    } else if (value > 4096) {
      throw 'must be lower or equal to 4096';
    }
  }

  setTooltip(id, text) {
    this.props.dispatch(setTooltipText(id, text));
  }

  updateOptions(customOptions = {}) {
    const options = {
      ...deepClone(this.state.options),
      ...customOptions
    };

    options.length = Number(options.length);
    options.small.min = Number(options.small.min);
    options.big.min = Number(options.big.min);
    options.numbers.min = Number(options.numbers.min);
    options.symbols.min = Number(options.symbols.min);
    options.punctuation.min = Number(options.punctuation.min);

    LocalStorage.set('options', options);

    if (!this.state.includeChecked) {
      options.include = '';
    }

    this.props.dispatch(setOptionsFields(options));
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="options-title">Options:</h3>
        <div className="options-wrapper">
          <div className="options-container">
            <OptionsField
              type="text"
              label="Password length"
              textValue={this.state.options.length}
              onTextChange={e => this.onTextInputChange(e, 'length', true)}
              textType="tel" // focus on numbers
              id="options-length"
              tooltip
              tooltipShow={this.props.tooltips.length.show}
              tooltipText={this.props.tooltips.length.text}
            />
            <OptionsField
              type="checkbox"
              label="small letters"
              checked={this.state.options.small.checked}
              onCheckboxChange={e => this.onCheckboxChange(e, 'small', true)}
              checkboxSettings
              checkboxSettingsValue={this.state.options.small.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'small')}
              help
              helpText="a-z"
              tooltip
              tooltipShow={this.props.tooltips.small.show}
              tooltipText={this.props.tooltips.small.text}
            />
            <OptionsField
              type="checkbox"
              label="big letters"
              checked={this.state.options.big.checked}
              onCheckboxChange={e => this.onCheckboxChange(e, 'big', true)}
              checkboxSettings
              checkboxSettingsValue={this.state.options.big.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'big')}
              help
              helpText="A-Z"
              tooltip
              tooltipShow={this.props.tooltips.big.show}
              tooltipText={this.props.tooltips.big.text}
            />
            <OptionsField
              type="checkbox"
              label="numbers"
              checked={this.state.options.numbers.checked}
              onCheckboxChange={e => this.onCheckboxChange(e, 'numbers', true)}
              checkboxSettings
              checkboxSettingsValue={this.state.options.numbers.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'numbers')}
              help
              helpText="0-9"
              tooltip
              tooltipShow={this.props.tooltips.numbers.show}
              tooltipText={this.props.tooltips.numbers.text}
            />
            <OptionsField
              type="checkbox"
              label="symbols"
              checked={this.state.options.symbols.checked}
              onCheckboxChange={e => this.onCheckboxChange(e, 'symbols', true)}
              checkboxSettings
              checkboxSettingsValue={this.state.options.symbols.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'symbols')}
              help
              helpMonospaced
              helpText={defaultOptions._characters.symbols}
              tooltip
              tooltipShow={this.props.tooltips.symbols.show}
              tooltipText={this.props.tooltips.symbols.text}
            />
            <OptionsField
              type="checkbox"
              label="punctuation"
              checked={this.state.options.punctuation.checked}
              onCheckboxChange={e => this.onCheckboxChange(e, 'punctuation', true)}
              checkboxSettings
              checkboxSettingsValue={this.state.options.punctuation.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'punctuation')}
              help
              helpMonospaced
              helpText={defaultOptions._characters.punctuation}
              tooltip
              tooltipShow={this.props.tooltips.punctuation.show}
              tooltipText={this.props.tooltips.punctuation.text}
            />
            <OptionsField
              type="checkbox"
              label="exclude similar"
              checked={this.state.options.similar}
              onCheckboxChange={e => this.onCheckboxChange(e, 'similar')}
              help
              helpMonospaced
              helpText={defaultOptions._characters.similar}
            />
            <OptionsField
              type="checkbox"
              label="exclude duplicates"
              checked={this.state.options.duplicates}
              onCheckboxChange={e => this.onCheckboxChange(e, 'duplicates')}
            />
            <OptionsField
              type="checkbox-text"
              label="include characters"
              checked={this.state.includeChecked}
              onCheckboxChange={this.onIncludeCheckboxChange}
              textValue={this.state.options.include}
              onTextChange={e => this.onTextInputChange(e, 'include')}
              textMonospaced={true}
              textDisabled={!this.state.includeChecked}
            />
          </div>
          <div className="options-container">
            <h3>More features coming soon!</h3>
          </div>
        </div>
        {this.props.options.errorMessage && (
          <p className="error-field">{this.props.options.errorMessage}</p>
        )}
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  options: state.options,
  tooltips: state.tooltips
});

export default connect(mapState)(Options);