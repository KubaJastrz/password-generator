import React from 'react';
import { connect } from 'react-redux';

import Options from './Options';

function OptionsContainer({ passwords }) {
  return (
    <div className="options-container">
      {passwords.error && (
        <p className="error-field">{passwords.error}</p>
      )}
      <h3 className="options-title">Options:</h3>
      <div className="options-wrapper">
        <Options />
      </div>
    </div>
  );
}

const mapState = (state) => ({
  options: state.options,
  passwords: state.passwords
});

export default connect(mapState)(OptionsContainer);