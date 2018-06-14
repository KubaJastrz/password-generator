import React from 'react';

import IconButton from '~/common/IconButton';
import HelpModal from '~/features/modals/HelpModal';

class AppHelp extends React.PureComponent {
  state = {
    isModalOpen: false
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <IconButton 
          type="help"
          onClick={this.openModal}
          className="app-help-button"
        />
        <HelpModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

export default AppHelp;