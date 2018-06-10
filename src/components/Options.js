import React from 'react';
import { connect } from 'react-redux';

import Button from './Button';
import DownloadModal from './modals/DownloadModal';
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

import {
  setActivePreset,
  setListOption,
  setPasswordOption
} from '../actions/options';
import {
  generatePassword,
  generatePasswordList,
  setPasswordError
} from '../actions/passwords';
import { setTooltipText } from '../actions/tooltips';

const actions = {
  generatePasswordList,
  setActivePreset,
  setListOption,
  setPasswordError,
  setPasswordOption,
  setTooltipText
};

class Options extends React.Component {
  state = {
    // keep copy of options in local state to perform some
    // logic operations and push it again to global store
    // FIXME?: this is technically selectors and actions job
    options: deepClone(this.props.options),
    isPresetsModalOpen: false,
    isDownloadModalOpen: false
  }

  openPresetsModal = () => {
    this.setState({ isPresetsModalOpen: true });
  }

  closePresetsModal = () => {
    this.setState({ isPresetsModalOpen: false });
  }

  openDownloadModal = () => {
    this.setState({ isDownloadModalOpen: true });
  }

  closeDownloadModal = () => {
    this.setState({ isDownloadModalOpen: false });
  }

  onCheckboxChange = (e, id, optionType, withSettings = false) => {
    const { checked } = e.target;

    this.setState(prevState => {
      if (withSettings) prevState.options[optionType][id].use = checked;
      else prevState.options[optionType][id] = checked;

      return prevState;
    }, () => this.updateOptionsField(id, optionType));
  }

  onCheckboxSettingsChange = (e, id, optionType) => {
    const { value } = e.target;

    this.setState(prevState => {
      prevState.options[optionType][id].min = value;
      return prevState;
    }, () => {
      if (value.match(/^\d+$/)) {
        if (this.props.tooltips[id].show === true) {
          this.setTooltip(id, '');
        }
        if (Number(value) !== this.props.options[optionType][id].min) {
          this.updateOptionsField(id, optionType);
        }
      } else if (value.length === 0) {
        this.setTooltip(id, 'must be greater than or equal to 0');
      } else {
        this.setTooltip(id, 'only numbers allowed');
      }
    });
  }

  onTextInputChange = (e, id, optionType, numeric = false, key) => {
    const { value } = e.target;

    this.setState(prevState => {
      if (key) prevState.options[optionType][id][key] = value;
      else prevState.options[optionType][id] = value;
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

          if (Number(value) !== this.props.options[optionType][id]) {
            this.updateOptionsField(id, optionType);
          }
        } else {
          this.setTooltip(id, 'only numbers allowed');
        }
      } else {
        this.updateOptionsField(id, optionType);
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
        !this.props.options.unlimitedPasswordLength
      ) {
        throw 'must be lower or equal to 4096';
      }
    } catch (err) {
      this.setTooltip('length', err);
      this.props.setPasswordOption({
        length: defaultOptions.length
      });
      return false;
    }

    return true;
  }

  setTooltip = (id, text) => {
    this.props.setTooltipText(id, text);
  }

  updateOptionsField = (id, optionType) => {
    const options = deepClone(this.state.options);

    options.password.length = parseInt(options.password.length);
    options.password.small.min = parseInt(options.password.small.min);
    options.password.big.min = parseInt(options.password.big.min);
    options.password.numbers.min = parseInt(options.password.numbers.min);
    options.password.symbols.min = parseInt(options.password.symbols.min);
    options.password.punctuation.min = parseInt(options.password.punctuation.min);
    options.list.passwordCount = parseInt(options.list.passwordCount);

    const value = options[optionType][id];

    if (optionType === 'password') {
      this.props.setPasswordOption({
        [id]: value
      });
    } else if (optionType === 'list') {
      this.props.setListOption({
        [id]: value
      });
    }

    LocalStorage.set('options', options);
  }

  generatePasswordList = () => {
    if (this.props.passwords.error != null) {
      this.props.setPasswordError(null);
    }
    const { list, password } = this.props.options;
    this.props.generatePasswordList(list.passwordCount, password);
  }

  onPresetSelect = (e) => {
    const { value } = e.target;

    if (value === 'new') {
      this.openPresetsModal();
      return;
    }
    
    if (value === 'none') {
      this.props.setActivePreset('none');
    } else {
      this.props.setActivePreset(value);
    }
  }

  componentDidUpdate(prevProps) {
    const prevOptions = prevProps.options;
    const { options } = this.props;
    if (
      prevOptions.unlimitedPasswordLength !==
      options.unlimitedPasswordLength
    ) {
      const { length } = options.password;
      const valid = this.parseLength(length);
      if (valid && options.password.length !== prevOptions.password.length) {
        this.props.setPasswordOption({ length: parseInt(length) });
      }
    }
  }

  componentDidMount() {
    this.parseLength(this.state.options.password.length);
  }

  render() {
    return (
      <React.Fragment>
        <div className="options-column">
          <OptionsText
            id="length"
            label="Password length"
            value={this.state.options.password.length}
            onChange={e => this.onTextInputChange(e, 'length', 'password', true)}
            textType="tel" // focus on numbers
            tooltip
            tooltipShow={this.props.tooltips.length.show}
            tooltipText={this.props.tooltips.length.text}
          />
          <OptionsCheckboxSettings
            id="small"
            label="small letters"
            checked={this.state.options.password.small.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'small', 'password', true)}
            textValue={this.state.options.password.small.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'small', 'password')}
            help
            helpText="a-z"
            tooltip
            tooltipShow={this.props.tooltips.small.show}
            tooltipText={this.props.tooltips.small.text}
          />
          <OptionsCheckboxSettings
            id="big"
            label="big letters"
            checked={this.state.options.password.big.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'big', 'password', true)}
            textValue={this.state.options.password.big.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'big', 'password')}
            help
            helpText="A-Z"
            tooltip
            tooltipShow={this.props.tooltips.big.show}
            tooltipText={this.props.tooltips.big.text}
          />
          <OptionsCheckboxSettings
            id="numbers"
            label="numbers"
            checked={this.state.options.password.numbers.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'numbers', 'password', true)}
            textValue={this.state.options.password.numbers.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'numbers', 'password')}
            help
            helpText="0-9"
            tooltip
            tooltipShow={this.props.tooltips.numbers.show}
            tooltipText={this.props.tooltips.numbers.text}
          />
          <OptionsCheckboxSettings
            id="symbols"
            label="symbols"
            checked={this.state.options.password.symbols.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'symbols', 'password', true)}
            textValue={this.state.options.password.symbols.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'symbols', 'password')}
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
            checked={this.state.options.password.punctuation.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'punctuation', 'password', true)}
            textValue={this.state.options.password.punctuation.min}
            onTextChange={e => this.onCheckboxSettingsChange(e, 'punctuation', 'password')}
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
            checked={this.state.options.password.similar}
            onChange={e => this.onCheckboxChange(e, 'similar', 'password')}
            help
            helpMonospaced
            helpText={defaultCharacters.similar}
          />
          <OptionsCheckbox
            id="duplicates"
            label="exclude duplicates"
            checked={this.state.options.password.duplicates}
            onChange={e => this.onCheckboxChange(e, 'duplicates', 'password')}
          />
          <OptionsCheckboxText
            id="include"
            label="include characters"
            checked={this.state.options.password.include.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'include', 'password', true)}
            textValue={this.state.options.password.include.value}
            onTextChange={e => this.onTextInputChange(e, 'include', 'password', false, 'value')}
            textMonospaced
            textDisabled={!this.state.options.password.include.use}
            help
            helpText="force include; not unique"
          />
          <OptionsCheckboxText
            id="exclude"
            label="exclude characters"
            checked={this.state.options.password.exclude.use}
            onCheckboxChange={e => this.onCheckboxChange(e, 'exclude', 'password', true)}
            textValue={this.state.options.password.exclude.value}
            onTextChange={e => this.onTextInputChange(e, 'exclude', 'password', false, 'value')}
            textMonospaced
            textDisabled={!this.state.options.password.exclude.use}
            help
            helpText="takes priority over include"
          />
        </div>
        <div className="options-column">
          {/* <PasswordStrength /> */}
          <OptionsText
            id="password-count"
            label="Password count"
            value={this.state.options.list.passwordCount}
            onChange={e => this.onTextInputChange(e, 'passwordCount', 'list', true)}
            tooltip
            tooltipShow={this.props.tooltips.passwordCount.show}
            tooltipText={this.props.tooltips.passwordCount.text}
          />
          {/* <OptionsSelect
            id="presets"
            label="List preset"
            value={this.props.options.activePreset}
            onChange={this.onPresetSelect}
          >
            {this.props.presets.map(preset => (
              <option key={preset.id} value={preset.name}>
                {preset.name}
              </option>
            ))}
            <option value="new">create new...</option>
          </OptionsSelect> */}
          <OptionsField className="center">
            <div className="options-button-group">
              <Button onClick={this.openDownloadModal}>
                download as...
              </Button>
              <Button onClick={this.generatePasswordList}>
                generate password list
              </Button>
            </div>
          </OptionsField>
        </div>
        <PresetsModal
          isOpen={this.state.isPresetsModalOpen}
          onRequestClose={this.closePresetsModal}
        />
        <DownloadModal
          isOpen={this.state.isDownloadModalOpen}
          onRequestClose={this.closeDownloadModal}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  options: state.options,
  passwords: state.passwords,
  presets: state.presets,
  tooltips: state.tooltips
});

export default connect(mapState, actions)(Options);