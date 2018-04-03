import React from 'react';
import PropTypes from 'prop-types';

const CopyButton = (props) => {
  const copy = () => {
    const el = props.copyRef;

    if (el) {
      el.select();
      document.execCommand('copy');
    }
  }

  return (
    <button onClick={copy}>copy</button>
  );
}

CopyButton.propTypes = {
  // copyRef: PropTypes.objectOf(PropTypes.instanceOf(HTMLInputElement))
};

export default CopyButton;