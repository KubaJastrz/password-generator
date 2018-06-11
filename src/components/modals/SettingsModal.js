import React from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import Checkbox from '../Checkbox';
import Modal from './Modal';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Key from '../Key';
import LocalStorage from '../../app/LocalStorage';

import { setUnlimitedPasswordLength } from '../../actions/options';

const actions = {
  setUnlimitedPasswordLength
};

class SettingsModal extends React.PureComponent {
  onUnlimitedLengthChange(e) {
    const { checked } = e.target;
    this.props.setUnlimitedPasswordLength(checked);
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
        className="settings-modal"
      >
        <h2 className="modal-title">Settings</h2>

        <div className="modal-section">
          <h4>App</h4>
          <div className="settings-button-group">
            <Button
              className="settings-button"
              onClick={this.clearLocalStorage}
            >
              clear local storage
            </Button>
            <div>
              <div className="description">Reset all application and password options to default values.</div>
              <div className="details"><Icon type="info" />this will reload the application</div>
            </div>
          </div>
        </div>

        <div className="modal-section">
          <h4>Password</h4>
          <label>
            <Checkbox
              checked={this.props.options.unlimitedPasswordLength}
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
  options: state.options
});

export default connect(mapState, actions)(SettingsModal);