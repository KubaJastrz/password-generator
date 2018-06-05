import React from 'react';

import Modal from './Modal';

class PresetsModal extends React.PureComponent {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Presets Manager"
      >
        <h2 className="modal-title">Presets</h2>
      </Modal>
    );
  }
}

export default PresetsModal;