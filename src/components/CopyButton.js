import React from 'react';
import PropTypes from 'prop-types';

import IconButton from './IconButton';
import { selectText } from '../utils/dom';

// TODO: success icon

const CopyButton = (props) => {
  const copy = () => {
    const el = props.copyRef;

    if (el instanceof HTMLElement) {
      selectText(el);
      document.execCommand('copy');
    } else {
      console.warn('`copyRef` is not an instance of HTMLElement!\n', el);
    }
  }

  return (
    <IconButton
      type="copy"
      onClick={copy}
      className="copy-button"
      focusable={false}
    />
  );
}

export default CopyButton;