import React from 'react';

import AppNotification from '~/features/notifications/AppNotification';
import LocalStorage from '~/app/LocalStorage';

// TODO: refactor all of this

class Notifications extends React.Component {
  constructor(props) {
    super();

    const showCookies = LocalStorage.get('showCookies', true);

    this.state = {
      showCookies
    };
  }

  reloadPage(e) {
    e.preventDefault();
    location.reload();
  }

  render() {
    return (
      <div className="app-notifications">
        {this.state.showCookies === true && (
          <AppNotification
            onClose={() => {
              this.setState({ showCookies: false });
              LocalStorage.set('showCookies', false);
            }}
          >
            This application uses local storage in your browser to ensure best user experience.
            Learn more <a href="https://en.wikipedia.org/wiki/Web_storage#Local_and_session_storage">here</a> and <a href="https://cookiesandyou.com/">here</a>.
            You agree to this by using the application.
          </AppNotification>
        )}
        {this.props.showUpdate === true && (
          <AppNotification
            onClose={() => {
              this.setState({ showUpdate: false });
            }}
          >
            New update is available.&nbsp;
            <a href="#" onClick={this.reloadPage}>Reload</a> to apply.
          </AppNotification>
        )}
      </div>
    );
  }
}

export default Notifications;