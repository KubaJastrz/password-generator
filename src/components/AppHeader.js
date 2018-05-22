import React from 'react';

import AppHelp from './AppHelp';

class AppHeader extends React.PureComponent {
  render() {
    return (
      <div className="app-header">
        <h1 className="app-title">Your password:</h1>
        <AppHelp />
      </div>
    );
  }
}

export default AppHeader;