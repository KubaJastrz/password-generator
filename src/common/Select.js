import React from 'react';

class Select extends React.PureComponent {
  render() {
    return (
      <select {...this.props} />
    );
  }
}

export default Select;