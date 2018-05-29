import React from 'react';

import IconButton from './IconButton';
import SettingsModal from './modals/SettingsModal';

class AppSettings extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

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
          ref={ref => this.modal = ref}
        />
      </React.Fragment>
    );
  }
}

export default AppSettings;