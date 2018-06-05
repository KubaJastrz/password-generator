import React from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';

import { addPreset } from '../../actions/presets';
import { setActivePreset } from '../../actions/options';

const actions = {
  addPreset,
  setActivePreset
};

class PresetsModal extends React.PureComponent {

  onAfterOpen = () => {
    // this.props.addPreset({});
  }

  onRequestClose = () => {
    this.props.setActivePreset('');
    this.props.onRequestClose();
  }

  componentDidUpdate() {
    // console.log(this.props.presets);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.onAfterOpen}
        onRequestClose={this.onRequestClose}
        contentLabel="Presets Manager"
      >
        <h2 className="modal-title">Presets</h2>
      </Modal>
    );
  }
}

const mapState = (state) => ({
  presets: state.presets
});

export default connect(mapState, actions)(PresetsModal);