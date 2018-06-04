import React from 'react';

import IconButton from './IconButton';
import SettingsModal from './modals/SettingsModal';

class AppSettings extends React.PureComponent {
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
          type="settings"
          onClick={this.openModal}
          className="app-settings-button"
        />
        <SettingsModal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

export default AppSettings;