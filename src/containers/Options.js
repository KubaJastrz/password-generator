import React from 'react';
import { connect } from 'react-redux';

import InfoBox from '../components/InfoBox';
import OptionsField from '../components/OptionsField';

import LocalStorage from '../lib/LocalStorage';
import { defaultOptions } from '../lib/generatePassword';
import { updateOptions } from '../actions/options';
import { deepClone } from '../utils';

class Options extends React.Component {
  state = {
    options: this.props.options,
    includeChecked: true,
    infoBoxText: {
      length: ''
    },
    unlimitedLength: true
  };

  onLengthChange = (e) => {
    const { value } = e.target;

    const loadDefault = () => this.updateOptions({
        length: defaultOptions.length
      });

    this.setState((prevState) => {
      prevState.options.length = value;
      return prevState;
    }, () => {
      if (!value || value.match(/^\d+$/)) {
        if (value < 1) {
          this.setInfoBox('length', 'must be greater than 0');
          loadDefault();
          return;
        } else if (value > 4096 && !this.state.unlimitedLength) {
          this.setInfoBox('length', 'must be lower or equal to 4096');
          loadDefault();
          return;
        }

        this.setInfoBox('length', '');
        this.updateOptions();
      } else {
        this.setInfoBox('length', 'only numbers allowed');
      }
    });
  };

  onCheckboxChange = (e, key, withSettings = false) => {
    const { checked } = e.target;

    this.setState((prevState) => {
      if (withSettings) prevState.options[key].checked = checked;
      else prevState.options[key] = checked;

      return prevState;
    }, this.updateOptions);
  };

  onCheckboxSettingsChange = (e, key, type) => {
    const { value } = e.target;

    this.setState((prevState) => {
      prevState.options[key][type] = value;
      return prevState;
    }, () => {
      if (type !== 'setValue') {
        this.updateOptions();
      }
      // type === 'setValue'
      else if (!value || value.match(/^\d+$/)) {
        this.updateOptions();
      }
    });
  };

  onIncludeCheckboxChange = () => {
    this.setState((prevState) => ({
      includeChecked: !prevState.includeChecked
    }), this.updateOptions);
  };

  onIncludeTextChange = (e) => {
    const { value } = e.target;

    this.setState((prevState) => {
      prevState.options.include = value;
      return prevState;
    }, this.updateOptions);
  };

  setInfoBox = (key, value) => {
    this.setState((prevState) => {
      prevState.infoBoxText[key] = value;
      return prevState;
    });
  };

  updateOptions(customOptions) {
    const options = {
      ...deepClone(this.state.options),
      ...customOptions
    };
    if (!this.state.includeChecked) {
      options.include = '';
    }
    options.length = Number(options.length);
    options.small.min = Number(options.small.min);
    options.big.min = Number(options.big.min);
    options.numbers.min = Number(options.numbers.min);
    options.symbols.min = Number(options.symbols.min);
    options.punctuation.min = Number(options.punctuation.min);

    this.props.dispatch(updateOptions(options));
    LocalStorage.set('options', options);
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
              onTextChange={this.onLengthChange}
              textType="tel" // focus on numbers
              id="options-length"
              infoBox={true}
              infoBoxText={this.state.infoBoxText.length}
            />
            <OptionsField
              type="checkbox"
              label="small letters"
              checked={this.state.options.small.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'small', true)}
              checkboxSettings={true}
              checkboxSettingsValue={this.state.options.small.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'small', 'min')}
            />
            <OptionsField
              type="checkbox"
              label="big letters"
              checked={this.state.options.big.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'big', true)}
              checkboxSettings={true}
              checkboxSettingsValue={this.state.options.big.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'big', 'min')}
            />
            <OptionsField
              type="checkbox"
              label="numbers"
              checked={this.state.options.numbers.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'numbers', true)}
              checkboxSettings={true}
              checkboxSettingsValue={this.state.options.numbers.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'numbers', 'min')}
            />
            <OptionsField
              type="checkbox"
              label="symbols"
              checked={this.state.options.symbols.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'symbols', true)}
              checkboxSettings={true}
              checkboxSettingsValue={this.state.options.symbols.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'symbols', 'min')}
            />
            <OptionsField
              type="checkbox"
              label="punctuation"
              checked={this.state.options.punctuation.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'punctuation', true)}
              checkboxSettings={true}
              checkboxSettingsValue={this.state.options.punctuation.min}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'punctuation', 'min')}
            />
            <OptionsField
              type="checkbox"
              label="exclude similar"
              checked={this.state.options.similar}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'similar')}
            />
            <OptionsField
              type="checkbox"
              label="exclude duplicates"
              checked={this.state.options.duplicates}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'duplicates')}
            />
            <OptionsField
              type="checkbox-text"
              label="include characters"
              checked={this.state.includeChecked}
              onCheckboxChange={this.onIncludeCheckboxChange}
              textValue={this.state.options.include}
              onTextChange={this.onIncludeTextChange}
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
  options: state.options
});

export default connect(mapState)(Options);