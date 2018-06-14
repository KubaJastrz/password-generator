import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';

import IconButton from './IconButton';

ReactModal.setAppElement('#app');

class Modal extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onAfterOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    contentLabel: PropTypes.string,
    className: PropTypes.string,
    overlayClassName: PropTypes.string
  };

  static defaultProps = {
    contentLabel: 'Modal'
  };

  onAfterOpen = () => {
    this.closeButton.button.focus();
    if (this.props.onAfterOpen) {
      this.props.onAfterOpen();
    }
  };

  render() {
    const className = classNames('modal', this.props.className);
    const overlayClassName = classNames(
      'modal-overlay', this.props.overlayClassName
    );

    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onAfterOpen={this.onAfterOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel={this.props.contentLabel}
        className={className}
        overlayClassName={overlayClassName}
      >
        <IconButton
          type="close"
          onClick={this.props.onRequestClose}
          className="modal-close-button"
          ref={ref => this.closeButton = ref}
        />

        {this.props.children}
      </ReactModal>
    );
  }
}

export default Modal;