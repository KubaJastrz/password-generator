import React from 'react';
import PropTypes from 'prop-types';

import Modal from '~/common/Modal';
import Button from '~/common/Button';

class ConfirmModal extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    onCancel: PropTypes.func, // fallback to onRequestClose if undefined
    onConfirm: PropTypes.func.isRequired,

    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    label: 'Are you sure?'
  }

  onCancel = () => {
    if (this.props.onCancel == null) {
      this.props.onRequestClose();
    } else {
      this.props.onCancel();
    }
  }

  onConfirm = () => {
    this.props.onConfirm();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        className="confirm-modal"
        overlayClassName="confirm-modal-overlay"
        contentLabel="Confirm"
      >
        <div className="confirm-modal-label">{this.props.label}</div>
        <div className="button-group">
          <Button onClick={this.onCancel}>cancel</Button>
          <Button onClick={this.onConfirm}>yes</Button>
        </div>
      </Modal>
    );
  }
}

export default ConfirmModal;