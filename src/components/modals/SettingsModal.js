import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

Modal.setAppElement('#app');

import Checkbox from '../Checkbox';
import IconButton from '../IconButton';
import Key from '../Key';

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
          <h4>Password</h4>
          <label>
            <Checkbox
              checked={this.props.config.unlimitedPasswordLength}
              onChange={e => this.onUnlimitedLengthChange(e)}
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