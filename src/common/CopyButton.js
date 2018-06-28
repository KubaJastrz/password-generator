import React from 'react';
import PropTypes from 'prop-types';

import IconButton from './IconButton';
import Tooltip from './Tooltip';
import { selectText } from '~/utils/dom';

class CopyButton extends React.PureComponent {
  state = {
    showTooltip: false
  }

  copy = (target) => {
    if (target instanceof HTMLElement) {
      selectText(target);
      document.execCommand('copy');
      this.showTooltip();
    } else {
      console.warn('`target` is not an instance of HTMLElement!\n', target);
    }
  }

  copyPropsTarget = () => {
    this.copy(this.props.target);
  }

  showTooltip = () => {
    this.setState({ showTooltip: true }, () => {
      setTimeout(() => {
        this.setState({ showTooltip: false });
      }, 2000);
    });
  }

  render() {
    const show = this.props.showCopiedTooltip || this.state.showTooltip;

    return (
      <div className="copy-button">
        <IconButton
          type="copy"
          onClick={this.copyPropsTarget}
          tabIndex="-1"
        />
        <Tooltip show={show} text="Copied!" />
      </div>
    );
  }
}

export default CopyButton;