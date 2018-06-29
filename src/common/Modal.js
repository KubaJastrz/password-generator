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
    onRequestClose: PropTypes.func.isRequired,
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
    const {
      className,
      overlayClassName,
      isOpen,
      onRequestClose,
      contentLabel,
      children
    } = this.props;

    const css = classNames('modal', className);
    const overlayCss = classNames('modal-overlay', overlayClassName);

    return (
      <ReactModal
        isOpen={isOpen}
        onAfterOpen={this.onAfterOpen}
        onRequestClose={onRequestClose}
        contentLabel={contentLabel}
        className={css}
        overlayClassName={overlayCss}
      >
        <IconButton
          type="close"
          onClick={onRequestClose}
          className="modal-close-button"
          ref={ref => this.closeButton = ref}
        />

        {children}
      </ReactModal>
    );
  }
}

export default Modal;