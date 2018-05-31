import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

Modal.setAppElement('#app');

import Checkbox from '../Checkbox';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Key from '../Key';
import LocalStorage from '../../app/LocalStorage';

import {
  setUnlimitedLength
} from '../../actions/config';

class SettingsModal extends React.PureComponent {
  constructor(props) {
    super();

    this.onAfterOpen = this.onAfterOpen.bind(this);
  }

  onAfterOpen() {
    this.closeButton.button.focus();
  }

  onUnlimitedLengthChange(e) {
    const { checked } = e.target;
    this.props.dispatch(setUnlimitedLength(checked));
  }

  clearLocalStorage() {
    LocalStorage.clearAll();
    window.location.reload();
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

        <div className="modal-section">
          <h4>App</h4>
          <div className="settings-button-group">
            <button
              className="settings-button"
              onClick={this.clearLocalStorage}
            >
              clear local storage
            </button>
            <div>
              <div className="description">This will reset all application and password options to default values.</div>
              <div className="details"><Icon type="info" />this will reload the application</div>
            </div>
          </div>
        </div>

        <div className="modal-section">
          <h4>Password</h4>
          <label>
            <Checkbox
              checked={this.props.config.unlimitedPasswordLength}
              onChange={e => this.onUnlimitedLengthChange(e)}
              type="material"
            />
            <span>unlimited length</span>
          </label>
        </div>

      </Modal>
    );
  }
}

const mapState = (state) => ({
  config: state.config
});

export default connect(mapState)(SettingsModal);