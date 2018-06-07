import React from 'react';
import * as serviceWorker from '../app/serviceWorker';

import AppHeader from './AppHeader';
import AppNotifications from './AppNotifications';
import MainPassword from './MainPassword';
import OptionsContainer from './OptionsContainer';
import PasswordList from './PasswordList';

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
        <OptionsContainer />
        <PasswordList />
        <AppNotifications showUpdate={this.state.showUpdatePopup} />
      </div>
    );
  }
}

export default App;