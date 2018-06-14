import React from 'react';
import * as serviceWorker from '~/app/serviceWorker';

import Header from './Header';
import Notifications from './Notifications';

import MainPassword from '~/features/passwords/MainPassword';
import PasswordList from '~/features/passwords/PasswordList';
import OptionsContainer from '~/features/options/OptionsContainer';

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
        <Header />
        <MainPassword />
        <OptionsContainer />
        <PasswordList />
        <Notifications showUpdate={this.state.showUpdatePopup} />
      </div>
    );
  }
}

export default App;