import React from 'react';
import { connect } from 'react-redux';

import Options from './Options';

function OptionsContainer({ options }) {
  return (
    <div className="options-container">
      <h3 className="options-title">Options:</h3>
      <div className="options-wrapper">
        <Options />
      </div>
      {options.errorMessage && (
        <p className="error-field">{options.errorMessage}</p>
      )}
    </div>
  );
}

const mapState = (state) => ({
  options: state.options
});

export default connect(mapState)(OptionsContainer);