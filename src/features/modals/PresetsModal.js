import React from 'react';
import { connect } from 'react-redux';

import Button from '~/common/Button';
import Modal from '~/common/Modal';
import TextInput from '~/common/TextInput';

import { addPreset } from '~/actions/presets';
import { setActivePreset } from '~/actions/options';

const actions = {
  addPreset,
  setActivePreset
};

class PresetsModal extends React.PureComponent {
  state = {
    name: '',
    created: false
  }

  onRequestClose = () => {
    const preset = {
      name: this.state.name
    };

    if (this.state.created) {
      this.props.setActivePreset(preset.name);
    } else {
      this.props.setActivePreset('');
    }

    this.props.onRequestClose();
  }

  onPresetSave = () => {
    const { name } = this.state;

    this.props.addPreset({
      name
    });

    this.setState({
      created: true
    }, this.onRequestClose);
  }

  onNameChange = (e) => {
    const { value } = e.target;

    this.setState({ name: value });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.onRequestClose}
        contentLabel="Presets Manager"
      >
        <h2 className="modal-title">Add new preset</h2>

        <TextInput
          value={this.state.name}
          onChange={this.onNameChange}
          className="in-modal"
        />
        preset name

        <Button onClick={this.onPresetSave}>save</Button>
      </Modal>
    );
  }
}

const mapState = (state) => ({
  presets: state.presets
});

export default connect(mapState, actions)(PresetsModal);