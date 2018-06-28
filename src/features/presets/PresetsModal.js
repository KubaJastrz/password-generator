import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';

import uuid from 'uuid/v4';

import Button from '~/common/Button';
import IconButton from '~/common/IconButton';
import Modal from '~/common/Modal';
import TextInput from '~/common/TextInput';

import SortablePresetList from './SortablePresetList';
import SortablePresetField from './SortablePresetField';

import { addPreset, editPreset, removePreset } from '~/actions/presets';
import { setActivePreset } from '~/actions/options';

import {
  getPresetFields,
  getPresetName,
  getPresetsNames
} from '~/selectors/presets';

import { deepClone } from '~/utils/lang';

const actions = {
  addPreset,
  editPreset,
  removePreset,
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
    editPreset: PropTypes.func,
    removePreset: PropTypes.func,
    setActivePreset: PropTypes.func
  }

  initialState = {
    id: '',
    name: '',
    fields: [],
    created: false,
    errors: {
      name: null,
      fields: null
    }
  }
  
  state = this.initialState

  afterModalOpen = () => {
    const { options, presets, type } = this.props;
    const { activePreset } = options;

    if (type === 'add') {
      this.generatePresetId();
      this.generatePresetName();
    } else if (type === 'edit') {
      const fields = getPresetFields(presets, activePreset).map(field => {
        return { ...field, id: uuid() };
      });

      this.setState({
        id: activePreset,
        name: getPresetName(presets, activePreset),
        fields,
        created: true
      });
    }
  }

  onRequestClose = () => {
    const { created, id } = this.state;
    const { options, setActivePreset, type } = this.props;

    if (created && type !== 'edit') {
      setActivePreset(id);
    }

    this.setState(this.initialState);

    this.props.onRequestClose();
  }

  onPresetSave = () => {
    const nameValid = this.validateName();
    const fieldsValid = this.validateFields();

    const { id, name, fields, errors } = this.state;
    const { type, addPreset, editPreset } = this.props;

    if (errors.name != null || errors.fields != null || !nameValid 
      || !fieldsValid) {
      return;
    }

    const pureFields = deepClone(fields).map(field => {
      field.length = this.parseInt(field.length);
      delete field.id;
      return field;
    });

    const finalPreset = { id, name, fields: pureFields };

    if (type === 'add') {
      addPreset(finalPreset);
    } else if (type === 'edit') {
      editPreset(finalPreset);
    }

    this.setState({
      created: true
    }, this.onRequestClose);
  }

  onNameChange = (e) => {
    const { value } = e.target;

    this.setState({ name: value }, this.validateName);
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

      return prevState;
    }, this.validateFields);
  }

  addNewField = (e) => {
    e.preventDefault();

    const field = {
      name: this.generateFieldName(),
      length: null, 
      id: uuid()
    };

    this.setState(prevState => {
      prevState.fields.push(field);
      return prevState;
    });
  }

  removeField = (id) => {
    this.setState(prevState => {
      prevState.fields = prevState.fields.filter(field => {
        return field.id !== id;
      });
      return prevState;
    });
  }

  removePreset = () => {
    this.props.removePreset(this.state.id);
    this.props.setActivePreset('0');
    this.onRequestClose();
  }

  generatePresetId = () => {
    this.setState({ id: uuid() });
  }

  generatePresetName = () => {
    const takenNames = getPresetsNames(this.props.presets);

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

  generateFieldName = () => {
    const n = this.state.fields.length + 1;
    return `name ${n}`;
  }

  validateName = () => {
    const { name } = this.state;
    const { options, presets } = this.props;
    const { activePreset } = options;
    const currentName = getPresetName(presets, activePreset);
    const takenNames = getPresetsNames(presets);

    let error = null;

    if (takenNames.includes(name) && name !== currentName) {
      error = 'this name is already taken';
    } else if (name.trim() === '') {
      error = 'name cannot be empty';
    }

    this.setError('name', error);
    return !error;
  }

  validateFields = () => {
    const { fields, errors } = this.state;

    let error = null;

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].name.trim() === '') {
        error = 'field names cannot be empty';
        break;
      } else if (fields[i].length && /\D/.test(fields[i].length)) {
        error = 'field lengths must be whole numbers';
        break;
      }
    }

    this.setError('fields', error);
    return !error;
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

  setError = (key, value) => {
    this.setState(prevState => {
      prevState.errors[key] = value;
      return prevState;
    });
  }

  onSortStart = () => {
    document.body.classList.add('js-is-dragging');
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    document.body.classList.remove('js-is-dragging');

    this.setState({
      fields: arrayMove(this.state.fields, oldIndex, newIndex)
    });
  }

  render() {
    const { type, isOpen, options } = this.props;

    const modalTitle = type === 'add' ? 'Add new preset' : 'Edit active preset';

    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={this.afterModalOpen}
        onRequestClose={this.onRequestClose}
        contentLabel="Presets Manager"
        className="presets-modal"
      >
        <h2 className="modal-title">{modalTitle}</h2>

        <label className="preset-name-group">
          Preset name
          <TextInput
            value={this.state.name}
            onChange={this.onNameChange}
            className="in-modal"
          />
        </label>

        <p className="error-field">{this.state.errors.name}</p>
        <p className="error-field">{this.state.errors.fields}</p>

        <h4>Fields:</h4>

        <div className="presets-list-wrapper">
          <SortablePresetList
            lockAxis="y"
            useDragHandle
            lockToContainerEdges
            lockOffset={0}
            onSortStart={this.onSortStart}
            onSortEnd={this.onSortEnd}
            fields={this.state.fields}
            onFieldRemove={this.removeField}
            onFieldChange={this.onFieldChange}
          />
          <Button onClick={this.addNewField} className="add-field-button">
            add new field
          </Button>
        </div>

        <div className="button-group">
          {type === 'edit' && options.activePreset !== '0' && (
            <Button onClick={this.removePreset} className="delete-button">
              delete preset...
            </Button>
          )}
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