import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '~/common/Button';
import Modal from '~/common/Modal';
import TextInput from '~/common/TextInput';

import { addPreset } from '~/actions/presets';
import { setActivePreset } from '~/actions/options';

import { getPresetNames } from '~/selectors/presets';

import { deepClone } from '~/utils/lang';

const actions = {
  addPreset,
  setActivePreset
};

class PresetsModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['add', 'edit']).isRequired,

    options: PropTypes.object,
    presets: PropTypes.array,
    addPreset: PropTypes.func,
    setActivePreset: PropTypes.func
  }
  
  state = {
    name: '',
    fields: [],
    created: false,
    error: null
  }

  generatePresetName = () => {
    const takenNames = getPresetNames(this.props.presets);

    const baseName = 'new';
    let name = baseName;

    let isNameValid;
    let i = 1;

    do {
      if (takenNames.includes(name)) {
        name = baseName + i;
        i++;
        isNameValid = false;
      } else {
        isNameValid = true;
      }
    } while (!isNameValid);

    this.setState({ name });
  }

  afterModalOpen = () => {
    this.generatePresetName();
  }

  onRequestClose = () => {
    const preset = {
      name: this.state.name
    };

    if (this.state.created) {
      this.props.setActivePreset(preset.name);
    } else {
      if (this.props.options.activePreset !== 'none') {
        this.props.setActivePreset('none');
      }
    }

    this.setState({
      name: '',
      fields: [],
      created: false,
      error: null
    });

    this.props.onRequestClose();
  }

  onPresetSave = () => {
    const validationError = this.validateFields();

    const { name, fields, error } = this.state;

    if (error != null || validationError != null) return;

    const pureFields = deepClone(fields).map(field => {
      field.length = this.parseInt(field.length);
      delete field.id;
      return field;
    });

    this.props.addPreset({
      name,
      fields: pureFields
    });

    this.setState({
      created: true
    }, this.onRequestClose);
  }

  onNameChange = (e) => {
    const { value } = e.target;
    const takenNames = getPresetNames(this.props.presets);

    this.setState({ name: value }, () => {
      if (takenNames.includes(value)) {
        this.setError('this name is already taken');
      } else {
        this.setError(null);
      }
    });
  }

  validateFields = () => {
    this.setState({ error: null });
    const { fields } = this.state;

    let error = null;

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].name.trim() === '') {
        error = 'field names cannot be empty';
        break;
      } else if (fields[i].length && fields[i].length.match(/\D/)) {
        error = 'field lengths must be whole numbers';
        break;
      }
    }

    this.setState({ error });
    return error;
  }

  parseInt = (number) => {
    if (number === '') {
      return null;
    } else if (number == null) {
      return number;
    } else {
      return parseInt(number);
    }
  }

  setError = (value) => {
    this.setState({ error: value });
  }

  addNewField = (e) => {
    e.preventDefault();

    const field = { name: '', length: null, id: Date.now() };

    this.setState(prevState => {
      prevState.fields.push(field);
      return prevState;
    });
  }

  onFieldChange = (e, id, key) => {
    const { value } = e.target;
    
    this.setState(prevState => {
      prevState.fields = prevState.fields.map(field => {
        if (field.id === id) {
          field[key] = value;
        }

        return field;
      });
    }, this.validateFields);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterModalOpen}
        onRequestClose={this.onRequestClose}
        contentLabel="Presets Manager"
        className="presets-modal"
      >
        <h2 className="modal-title">Add new preset</h2>

        <label>
          Preset name
          <TextInput
            value={this.state.name}
            onChange={this.onNameChange}
            className="in-modal"
          />
        </label>

        <p className="error-field">{this.state.error}</p>

        <h4>Fields:</h4>

        <ul>
          {this.state.fields.map(field => (
            <li key={field.id}>
              <TextInput
                defaultValue={field.name}
                onChange={e => this.onFieldChange(e, field.id, 'name')}
                className="in-modal name"
                placeholder="field name"
              />
              <TextInput
                defaultValue={field.length}
                onChange={e => this.onFieldChange(e, field.id, 'length')}
                className="in-modal length"
                placeholder="field length"
              />
            </li>
          ))}
          <li><a href="#" onClick={this.addNewField}>add new field</a></li>
        </ul>

        <div className="button-group">
          <Button onClick={this.onRequestClose} type="secondary">cancel</Button>
          <Button onClick={this.onPresetSave}>save</Button>
        </div>
      </Modal>
    );
  }
}

const mapState = (state) => ({
  options: state.options,
  presets: state.presets
});

export default connect(mapState, actions)(PresetsModal);