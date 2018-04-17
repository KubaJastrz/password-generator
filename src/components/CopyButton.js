import React from 'react';
import PropTypes from 'prop-types';

// TODO: success icon

const CopyButton = (props) => {
  const copy = () => {
    const el = props.copyRef;

    if (el instanceof HTMLInputElement) {
      el.select();
      document.execCommand('copy');
    } else {
      console.warn('`copyRef` is not an instance of HTMLInputElement!\n', el);
    }
  }

  return (
    <button
      onClick={copy}
      className="copy-button"
      tabIndex="-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
    </button>
  );
}

export default CopyButton;