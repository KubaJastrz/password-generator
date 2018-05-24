import React from 'react';
import Modal from 'react-modal';

import IconButton from './IconButton';

Modal.setAppElement('#app');

const Key = (props) => (
  <span className="key">{props.children}</span>
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
          className="ReactModal__Content"
        >
          <IconButton
            type="close"
            onClick={this.closeModal}
            className="modal-close-button"
            ref={ref => this.closeModalButton = ref}
          />

          <h2 className="modal-title">Password Generator</h2>
          <p>You can use <Key>Tab</Key> key to navigate through application, <Key>Space</Key> or <Key>Enter</Key> to generate new password and <Key>CTRL/Cmd + C</Key> to copy main password.</p>
          <p>Options are automatically saved in local storage.</p>
          <p><a href="https://github.com/KubaJastrz/password-generator">GitHub repo link</a></p>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AppHelp;