import React from 'react';
import { connect } from 'react-redux';

import Button from './Button';
import OptionsCheckbox from './OptionsFields/OptionsCheckbox';
import OptionsCheckboxText from './OptionsFields/OptionsCheckboxText';
import OptionsCheckboxSettings from './OptionsFields/OptionsCheckboxSettings';
import OptionsField from './OptionsFields/OptionsField';
import OptionsText from './OptionsFields/OptionsText';
import OptionsSelect from './OptionsFields/OptionsSelect';

import PasswordStrength from './PasswordStrength';
import PresetsModal from './modals/PresetsModal';

import LocalStorage from '../app/LocalStorage';
import { defaultOptions, defaultCharacters } from '../app/generatePassword';
import { deepClone, isInteger } from '../utils/lang';

import { setActivePreset, setOptionsFields } from '../actions/options';
import { generatePasswordList } from '../actions/passwords';
import { setTooltipText } from '../actions/tooltip';

const actions = {
  generatePasswordList,
  setActivePreset,
  setOptionsFields,
  setTooltipText
};

class Options extends React.Component {
  state = {
    // keep copy of options in local state to perform some
    // logic operations and push it again to global store
    // FIXME?: this is technically selectors and actions job
    options: deepClone(this.props.options),
    isPresetsModalOpen: false
  }

  openPresetsModal = () => {
    this.setState({ isPresetsModalOpen: true });
  }

  closePresetsModal = () => {
    this.setState({ isPresetsModalOpen: false });
  }

  onCheckboxChange = (e, id, withSettings = false) => {
    const { checked } = e.target;

    this.setState(prevState => {
      if (withSettings) prevState.options[id].use = checked;
      else prevState.options[id] = checked;

      return prevState;
    }, () => this.updateOptionsField(id));
  }

  onCheckboxSettingsChange = (e, id) => {
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

  onTextInputChange = (e, id, numeric = false, key) => {
    const { value } = e.target;

    this.setState(prevState => {
      if (key) prevState.options[id][key] = value;
      else prevState.options[id] = value;
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

  parseLength = (value) => {
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
      this.props.setOptionsFields({
        length: defaultOptions.length
      });
      return false;
    }

    return true;
  }

  setTooltip = (id, text) => {
    this.props.setTooltipText(id, text);
  }

  updateOptionsField = (id) => {
    const options = deepClone(this.state.options);

    options.length = parseInt(options.length);
    options.small.min = parseInt(options.small.min);
    options.big.min = parseInt(options.big.min);
    options.numbers.min = parseInt(options.numbers.min);
    options.symbols.min = parseInt(options.symbols.min);
    options.punctuation.min = parseInt(options.punctuation.min);
    options.passwordCount = parseInt(options.passwordCount);

    const value = options[id];

    this.props.setOptionsFields({
      [id]: value
    });

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
        <div className="options-column">
          <OptionsText
            id="length"
            label="Password length"
            value={this.state.options.length}
            onChange={e => this.onTextInputChange(e, 'length', true)}
            textType="tel" // focus on numbers
            tooltip
            tooltipShow={this.props.tooltips.length.show}
            tooltipText={this.props.tooltips.length.text}
          />
          <OptionsCheckboxSettings
            id="small"
            label="small letters"
            checked={this.state.options.small.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'small', true)}
            textValue={this.state.options.small.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'small')}
            help
            helpText="a-z"
            tooltip
            tooltipShow={this.props.tooltips.small.show}
            tooltipText={this.props.tooltips.small.text}
          />
          <OptionsCheckboxSettings
            id="big"
            label="big letters"
            checked={this.state.options.big.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'big', true)}
            textValue={this.state.options.big.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'big')}
            help
            helpText="A-Z"
            tooltip
            tooltipShow={this.props.tooltips.big.show}
            tooltipText={this.props.tooltips.big.text}
          />
          <OptionsCheckboxSettings
            id="numbers"
            label="numbers"
            checked={this.state.options.numbers.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'numbers', true)}
            textValue={this.state.options.numbers.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'numbers')}
            help
            helpText="0-9"
            tooltip
            tooltipShow={this.props.tooltips.numbers.show}
            tooltipText={this.props.tooltips.numbers.text}
          />
          <OptionsCheckboxSettings
            id="symbols"
            label="symbols"
            checked={this.state.options.symbols.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'symbols', true)}
            textValue={this.state.options.symbols.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'symbols')}
            help
            helpMonospaced
            helpText={defaultCharacters.symbols}
            tooltip
            tooltipShow={this.props.tooltips.symbols.show}
            tooltipText={this.props.tooltips.symbols.text}
          />
          <OptionsCheckboxSettings
            id="punctuation"
            label="punctuation"
            checked={this.state.options.punctuation.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'punctuation', true)}
            textValue={this.state.options.punctuation.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'punctuation')}
            help
            helpMonospaced
            helpText={defaultCharacters.punctuation}
            tooltip
            tooltipShow={this.props.tooltips.punctuation.show}
            tooltipText={this.props.tooltips.punctuation.text}
          />
          <OptionsCheckbox
            id="similar"
            label="exclude similar"
            checked={this.state.options.similar}
            onChange={e => this.onCheckboxChange(e, 'similar')}
            help
            helpMonospaced
            helpText={defaultCharacters.similar}
          />
          <OptionsCheckbox
            id="duplicates"
            label="exclude duplicates"
            checked={this.state.options.duplicates}
            onChange={e => this.onCheckboxChange(e, 'duplicates')}
          />
          <OptionsCheckboxText
            id="include"
            label="include characters"
            checked={this.state.options.include.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'include', true)}
            textValue={this.state.options.include.value}
            onTextChange={e => this.onTextInputChange(e, 'include', false, 'value')}
            textMonospaced
            textDisabled={!this.state.options.include.use}
            help
            helpText="force include; not unique"
          />
          <OptionsCheckboxText
            id="exclude"
            label="exclude characters"
            checked={this.state.options.exclude.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'exclude', true)}
            textValue={this.state.options.exclude.value}
            onTextChange={e => this.onTextInputChange(e, 'exclude', false, 'value')}
            textMonospaced
            textDisabled={!this.state.options.exclude.use}
            help
            helpText="takes priority over include"
          />
        </div>
        <div className="options-column">
          {/* <PasswordStrength /> */}
          <OptionsText
            id="password-count"
            label="Password count"
            value={this.state.options.passwordCount}
            onChange={e => this.onTextInputChange(e, 'passwordCount', true)}
            tooltip
            tooltipShow={this.props.tooltips.passwordCount.show}
            tooltipText={this.props.tooltips.passwordCount.text}
          />
          <OptionsSelect
            id="presets"
            label="List preset"
            value={this.props.options.activePreset}
            onChange={e => {
              const { value } = e.target;
              
              if (value === 'none') {
                this.props.setActivePreset('');
              } else {
                this.props.setActivePreset(value);
              }

              if (value === 'new') {
                this.openPresetsModal();
              }
            }}
          >
            {this.props.presets.map(preset => (
              <option key={preset.id} value={preset.name}>
                {preset.name}
              </option>
            ))}
            <option value="new">create new...</option>
          </OptionsSelect>
          <OptionsField>
            <Button onClick={() => {
              // FIXME: move options to passwordOptions in app/initialState
              const { passwordCount, ...options } = this.props.options;
              this.props.generatePasswordList(passwordCount, options);
            }}>
              generate password list
            </Button>
          </OptionsField>
        </div>
        <PresetsModal
          isOpen={this.state.isPresetsModalOpen}
          onRequestClose={this.closePresetsModal}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  config: state.config,
  options: state.options,
  presets: state.presets,
  tooltips: state.tooltips
});

export default connect(mapState, actions)(Options);