import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

import IconButton from '../IconButton';
import Key from '../Key';

class HelpModal extends React.PureComponent {
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
        contentLabel="Help"
        className="ReactModal"
        overlayClassName="ReactModalOverlay"
      >
        <IconButton
          type="close"
          onClick={this.props.onRequestClose}
          className="modal-close-button"
          ref={ref => this.closeButton = ref}
        />

        <h2 className="modal-title">Password Generator</h2>
        <p>Keyboard shortcuts:</p>
        <ul>
          <li><Key>Tab</Key> and <Key>Shift</Key> + <Key>Tab</Key> to navigate through application</li>
          <li><Key>Space</Key> to select a checkbox</li>
          <li><Key>Enter</Key> to generate new password</li>
          <li><Key>Ctrl</Key>/<Key>Cmd</Key> + <Key>C</Key> to copy main password</li>
        </ul>
        <p>Options are automatically saved in local storage.</p>
        <p>Source code available at <a href="https://github.com/KubaJastrz/password-generator">GitHub repository</a>.</p>
      </Modal>
    );
  }
}

export default HelpModal;