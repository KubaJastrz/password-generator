import React from 'react';
import * as serviceWorker from '../app/serviceWorker';

import AppHeader from '../components/AppHeader';
import AppHelp from '../components/AppHelp';
import AppNotifications from '../components/AppNotifications';
import MainPassword from './MainPassword';
import Options from './Options';

class App extends React.PureComponent {
  constructor(props) {
    super();

    this.state = {
      showUpdatePopup: false
    };

    this.handleServiceWorkerUpdate = this.handleServiceWorkerUpdate.bind(this);

    if (process.env.NODE_ENV === 'production') {
      serviceWorker.register({
        onUpdate: this.handleServiceWorkerUpdate
      });
    }
  }

  handleServiceWorkerUpdate(registration) {
    this.setState({ showUpdatePopup: true });
  }

  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <MainPassword />
        <Options />
        <AppNotifications showUpdate={this.state.showUpdatePopup} />
      </div>
    );
  }
}

export default App;