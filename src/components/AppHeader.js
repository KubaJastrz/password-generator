import React from 'react';

import AppHelp from './AppHelp';
import AppSettings from './AppSettings';

class AppHeader extends React.PureComponent {
  render() {
    return (
      <div className="app-header">
        <h1 className="app-title">Your password:</h1>
        <div className="app-header-buttons">
          <AppSettings />
          <AppHelp />
        </div>
      </div>
    );
  }
}

export default AppHeader;