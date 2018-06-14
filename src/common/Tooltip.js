import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getCoords } from '~/utils/dom';

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

  constructor(props) {
    super();

    this.state = {
      placement: props.placement
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentDidUpdate(prevProps) {
    if (this.props.show/* && this.props.text !== prevProps.text*/) {
      this.fitOnScreen();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize() {
    if (this.state.placement !== this.props.placement) {
      this.setState({ placement: this.props.placement });
    }

    if (this.props.show) {
      this.fitOnScreen();
    }
  }

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
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };

    let fitsHorizontally = true;

    if ((coords.left + coords.width) > screen.width) {
      fitsHorizontally = false;
    }

    if (!fitsHorizontally) {
      const { placement } = this.state;

      if (placement === 'right') {
        this.setState({ placement: 'bottom' }, this.fitOnScreen);
      }

      if (placement === 'bottom') {
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
      this.state.placement,
      { monospace: this.props.monospaced }
    );

    const innerHTML = () => ({
      __html: '<div class="arrow"></div>' + this.props.text
    });

    return (
      <div
        ref={n => this.tooltip = n}
        className={className}
        dangerouslySetInnerHTML={innerHTML()}>
      </div>
    );
  }
}

export default Tooltip;