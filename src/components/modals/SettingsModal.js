import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

import IconButton from '../IconButton';
import Key from '../Key';

class SettingsModal extends React.PureComponent {
  constructor(props) {
    super();

    this.onAfterOpen = this.onAfterOpen.bind(this);
  }

  onAfterOpen() {
    this.closeButton.button.focus();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.onAfterOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Settings"
        className="ReactModal SettingsModal"
        overlayClassName="ReactModalOverlay"
      >
        <IconButton
          type="close"
          onClick={this.props.onRequestClose}
          className="modal-close-button"
          ref={ref => this.closeButton = ref}
        />

        <h2 className="modal-title">Settings</h2>

        <p>Hello there!</p>

        </Modal>
    );
  }
}

export default SettingsModal;