import React, { Fragment } from 'react';

import AppHelp from './AppHelp';
import MainPassword from '../MainPassword';
import Options from '../Options';

const App = () => (
  <div className="app-container">
    <div className="app-header">
      <h1 className="app-title">Your password:</h1>
      <AppHelp />
    </div>
    <MainPassword />
    <Options />
  </div>
);

export default App;