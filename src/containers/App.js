import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import MainPassword from './MainPassword';
import Options from './Options';

const App = () => (
  <Fragment>
    <h1>Your password:</h1>
    <MainPassword />
    <Options />
  </Fragment>
);

export default App;