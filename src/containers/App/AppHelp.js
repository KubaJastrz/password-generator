import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

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
    this.closeModalButton.focus();
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.openModal} className="app-help-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
        </button>
        <Modal
          isOpen={this.state.isModalOpen}
          onAfterOpen={this.afterModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Help"
          className="ReactModal__Content"
        >
          <button
            onClick={this.closeModal}
            className="modal-close-button"
            ref={ref => this.closeModalButton = ref}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>

          <h2 className="modal-title">Password Generator</h2>
          <p>A web application created with the aim of learning best practices and commonly used patterns in modern development.</p>
          <p>Used tools and frameworks:</p>
          <ul>
            <li><a href="https://reactjs.org/">react</a> + <a href="https://redux.js.org/">redux</a> for view model and state management</li>
            <li><a href="https://github.com/reactjs/react-modal">react-modal</a> specifically for this window</li>
            <li><a href="https://sass-lang.com/">sass</a> for more advanced styling system</li>
            <li><a href="https://webpack.js.org/">webpack</a> + <a href="https://babeljs.io/">babel</a> for development environment and es6+ support</li>
          </ul>
          <p><a href="https://github.com/KubaJastrz/password-generator">GitHub repo link</a></p>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AppHelp;