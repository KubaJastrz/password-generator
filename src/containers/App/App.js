import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import MainPassword from '../MainPassword';
import Options from '../Options';

const App = () => (
  <div className="app-container">
    <h1 className="app-title">Your password:</h1>
    <MainPassword />
    <Options />
  </div>
);

export default App;