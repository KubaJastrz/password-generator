import React from 'react';
import Modal from 'react-modal';

import IconButton from './IconButton';

Modal.setAppElement('#app');

const Key = (props) => (
  <kbd className="key">{props.children}</kbd>
);

class AppHelp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterModalOpen = this.afterModalOpen.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  afterModalOpen() {
    this.closeModalButton.button.focus();
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <IconButton 
          type="help"
          onClick={this.openModal}
          className="app-help-button"
        />
        <Modal
          isOpen={this.state.isModalOpen}
          onAfterOpen={this.afterModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Help"
          className="ReactModal"
          overlayClassName="ReactModalOverlay"
        >
          <IconButton
            type="close"
            onClick={this.closeModal}
            className="modal-close-button"
            ref={ref => this.closeModalButton = ref}
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
      </React.Fragment>
    );
  }
}

export default AppHelp;