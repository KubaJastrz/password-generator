import React from 'react';
import * as serviceWorker from '../app/serviceWorker';

import AppHelp from '../components/AppHelp';
import MainPassword from './MainPassword';
import Options from './Options';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV === 'production') {
      serviceWorker.register({
        onUpdate: this.handleServiceWorkerUpdate
      });
    }
  }

  handleServiceWorkerUpdate(registration) {
    // TODO: show a message
  }

  render() {
    return (
      <div className="app-container">
      xd
        <div className="app-header">
          <h1 className="app-title">Your password:</h1>
          <AppHelp />
        </div>
        <MainPassword />
        <Options />
      </div>
    );
  }
}

export default App;