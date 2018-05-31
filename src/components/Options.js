import React from 'react';
import { connect } from 'react-redux';

import OptionsField from './OptionsField';
import { setOptionsFields } from '../actions/options';
import { setTooltipText } from '../actions/tooltip';

import LocalStorage from '../app/LocalStorage';
import { defaultOptions } from '../app/generatePassword';
import { deepClone, isInteger } from '../utils/lang';

class Options extends React.Component {
  constructor(props) {
    super();

    // keep copy of options in local state
    // to perform some logic operations
    // and push it again to global store
    this.state = {
      options: deepClone(props.options)
    };

    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.parseLength = this.parseLength.bind(this);
    this.setTooltip = this.setTooltip.bind(this);
  }

  onCheckboxChange(e, id, withSettings = false) {
    const { checked } = e.target;

    this.setState(prevState => {
      if (withSettings) prevState.options[id].checked = checked;
      else prevState.options[id] = checked;

      return prevState;
    }, () => this.updateOptionsField(id));
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
          this.updateOptionsField(id);
        }
      } else if (value.length === 0) {
        this.setTooltip(id, 'must be greater than or equal to 0');
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
            const valid = this.parseLength(value);
            if (!valid) return;
          }

          if (this.props.tooltips[id].show && id !== 'length') {
            this.setTooltip(id, '');
          }

          if (Number(value) !== this.props.options[id]) {
            this.updateOptionsField(id);
          }
        } else {
          this.setTooltip(id, 'only numbers allowed');
        }
      } else {
        this.updateOptionsField(id);
      }
    });
  }

  parseLength(value) {
    if (this.props.tooltips.length.show) {
      this.setTooltip('length', '');
    }
    try {
      if (value < 1) {
        throw 'must be greater than 0';
      } else if (
        value > 4096 &&
        !this.props.config.unlimitedPasswordLength
      ) {
        throw 'must be lower or equal to 4096';
      }
    } catch (err) {
      this.setTooltip('length', err);
      this.props.dispatch(setOptionsFields({
        length: defaultOptions.length
      }));
      return false;
    }

    return true;
  }

  setTooltip(id, text) {
    this.props.dispatch(setTooltipText(id, text));
  }

  updateOptionsField(id) {
    const options = deepClone(this.state.options);

    options.length = parseInt(options.length);
    options.small.min = parseInt(options.small.min);
    options.big.min = parseInt(options.big.min);
    options.numbers.min = parseInt(options.numbers.min);
    options.symbols.min = parseInt(options.symbols.min);
    options.punctuation.min = parseInt(options.punctuation.min);

    const value = options[id];

    this.props.dispatch(setOptionsFields({
      [id]: value
    }));

    LocalStorage.set('options', options);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.config.unlimitedPasswordLength !==
      this.props.config.unlimitedPasswordLength
    ) {
      this.parseLength(this.state.options.length);
    }
  }

  componentDidMount() {
    this.parseLength(this.state.options.length);
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
              checked={this.state.options.includeChecked}
              onCheckboxChange={e => this.onCheckboxChange(e, 'includeChecked')}
              textValue={this.state.options.include}
              onTextChange={e => this.onTextInputChange(e, 'include')}
              textMonospaced
              textDisabled={!this.state.options.includeChecked}
              help
              helpText="force include; unique"
            />
            <OptionsField
              type="checkbox-text"
              label="exclude characters"
              checked={this.state.options.excludeChecked}
              onCheckboxChange={e => this.onCheckboxChange(e, 'excludeChecked')}
              textValue={this.state.options.exclude}
              onTextChange={e => this.onTextInputChange(e, 'exclude')}
              textMonospaced
              textDisabled={!this.state.options.excludeChecked}
              help
              helpText="takes priority over include"
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
  config: state.config,
  options: state.options,
  tooltips: state.tooltips
});

export default connect(mapState)(Options);