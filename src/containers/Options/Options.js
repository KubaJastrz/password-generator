import React from 'react';
import { connect } from 'react-redux';

import InfoBox from '../../components/InfoBox';
import OptionsField from '../../components/OptionsField';

import LocalStorage from '../../lib/LocalStorage';
import { updateOptions } from './actions';
import { deepClone } from '../../utils';

class Options extends React.Component {
  state = {
    options: this.props.options,
    includeChecked: true,
    infoBoxText: {
      length: ''
    }
  };

  onLengthChange = (e) => {
    const { value } = e.target;

    this.setState((prevState) => {
      prevState.options.length = value;
      return prevState;
    }, () => {
      if (!value || value.match(/^\d+$/)) {
        this.updateOptions();
        this.setState((prevState) => {
          prevState.infoBoxText.length = '';
          return prevState;
        })
      } else {
        this.setState((prevState) => {
          prevState.infoBoxText.length = 'only numbers allowed';
          return prevState;
        })
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

  updateOptions() {
    const options = deepClone(this.state.options);
    if (!this.state.includeChecked) {
      options.include = '';
    }
    options.length = Number(options.length);
    options.small.setValue = Number(options.small.setValue);
    options.big.setValue = Number(options.big.setValue);
    options.numbers.setValue = Number(options.numbers.setValue);
    options.symbols.setValue = Number(options.symbols.setValue);
    options.punctuation.setValue = Number(options.punctuation.setValue);

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
              checkboxSettingsSelect={this.state.options.small.set}
              checkboxSettingsValue={this.state.options.small.setValue}
              onCheckboxSettingsSelectChange={e => this.onCheckboxSettingsChange(e, 'small', 'set')}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'small', 'setValue')}
            />
            <OptionsField
              type="checkbox"
              label="big letters"
              checked={this.state.options.big.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'big', true)}
              checkboxSettings={true}
              checkboxSettingsSelect={this.state.options.big.set}
              checkboxSettingsValue={this.state.options.big.setValue}
              onCheckboxSettingsSelectChange={e => this.onCheckboxSettingsChange(e, 'big', 'set')}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'big', 'setValue')}
            />
            <OptionsField
              type="checkbox"
              label="numbers"
              checked={this.state.options.numbers.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'numbers', true)}
              checkboxSettings={true}
              checkboxSettingsSelect={this.state.options.numbers.set}
              checkboxSettingsValue={this.state.options.numbers.setValue}
              onCheckboxSettingsSelectChange={e => this.onCheckboxSettingsChange(e, 'numbers', 'set')}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'numbers', 'setValue')}
            />
            <OptionsField
              type="checkbox"
              label="symbols"
              checked={this.state.options.symbols.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'symbols', true)}
              checkboxSettings={true}
              checkboxSettingsSelect={this.state.options.symbols.set}
              checkboxSettingsValue={this.state.options.symbols.setValue}
              onCheckboxSettingsSelectChange={e => this.onCheckboxSettingsChange(e, 'symbols', 'set')}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'symbols', 'setValue')}
            />
            <OptionsField
              type="checkbox"
              label="punctuation"
              checked={this.state.options.punctuation.checked}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'punctuation', true)}
              checkboxSettings={true}
              checkboxSettingsSelect={this.state.options.punctuation.set}
              checkboxSettingsValue={this.state.options.punctuation.setValue}
              onCheckboxSettingsSelectChange={e => this.onCheckboxSettingsChange(e, 'punctuation', 'set')}
              onCheckboxSettingsValueChange={e => this.onCheckboxSettingsChange(e, 'punctuation', 'setValue')}
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