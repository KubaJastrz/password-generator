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
          <p>A web application created with the aim of learning best practices and commonly used patterns in modern development.</p>
          <p>You can use <Key>Tab</Key> key to navigate through application, <Key>Space</Key> or <Key>Enter</Key> to generate new password and <Key>CTRL/Cmd + C</Key> to copy main password.</p>
          <p>Options are automatically saved in local storage.</p>
          <p>Used tools and frameworks:</p>
          <ul>
            <li><a href="https://reactjs.org/">react</a> + <a href="https://redux.js.org/">redux</a> for view model and state management</li>
            <li><a href="https://github.com/reactjs/react-modal">react-modal</a> specifically for this window</li>
            <li><a href="https://sass-lang.com/">sass</a> for more advanced styling system</li>
            <li><a href="https://webpack.js.org/">webpack</a> + <a href="https://babeljs.io/">babel</a> for development environment and es6+ support</li>
            <li><a href="https://facebook.github.io/jest/">jest</a> for testing environment</li>
          </ul>
          <p><a href="https://github.com/KubaJastrz/password-generator">GitHub repo link</a></p>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AppHelp;