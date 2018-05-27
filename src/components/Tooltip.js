import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getCoords } from '../utils/dom';

class Tooltip extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    placement: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
    monospaced: PropTypes.bool,
  };

  static defaultProps = {
    show: false,
    type: 'info',
    placement: 'bottom'
  };

  componentDidUpdate(prevProps) {
    if ( this.props.show && this.props.text !== prevProps.text) {
      this.fitOnScreen();
    }
  }

  // TODO: window resize support
  // doesn't work in responsive device in devtools (unrelated bug)
  fitOnScreen() {
    const arrow = this.tooltip.querySelector('.arrow');
    
    // reset before getting coords
    this.tooltip.style.left = null;
    this.tooltip.style.transform = null;
    arrow.style.left = null;
    arrow.style.transform = null;
    arrow.style.right = null;

    const coords = getCoords(this.tooltip);
    const parentCoords = getCoords(this.tooltip.parentNode);

    const screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const side = parentCoords.left > (screen.width/2) ? 'right' : 'left';

    let fitsHorizontally = true;

    if ((coords.left + coords.width) > screen.width) {
      fitsHorizontally = false;
    }

    if (!fitsHorizontally) {
      if (side === 'right') {
        const right = screen.width - parentCoords.right - 10;

        const offset = coords.width - parentCoords.width - right;
        this.tooltip.style.left = `-${offset}px`;
        this.tooltip.style.transform = 'unset';

        arrow.style.left = 'unset';
        arrow.style.transform = 'translateX(50%)';
        arrow.style.right = `${parentCoords.width/2 + right}px`;
      }
    }
  }

  render() {
    const className = classNames(
      'tooltip',
      { active: this.props.show },
      this.props.type,
      this.props.placement,
      { monospace: this.props.monospaced }
    );

    return (
      <div ref={n => this.tooltip = n} className={className}>
        <div className="arrow"></div>
        {this.props.text}
      </div>
    );
  }
}

export default Tooltip;