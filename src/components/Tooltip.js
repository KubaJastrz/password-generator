import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

  getCoords(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      width: rect.width,
      height: rect.height,
      node: element
    };
  }

  // doesn't work in responsive device in devtools (unrelated bug)
  fitOnScreen() {
    const arrow = this.tooltip.querySelector('.arrow');
    
    // reset before getting coords
    this.tooltip.style.left = null;
    this.tooltip.style.transform = null;
    arrow.style.left = null;
    arrow.style.transform = null;
    arrow.style.right = null;

    const coords = this.getCoords(this.tooltip);
    const parentCoords = this.getCoords(this.tooltip.parentNode);

    const screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const side = coords.left > (screen.width/2) ? 'right' : 'left';

    let fitsHorizontally = true;

    if ((coords.left + coords.width) > screen.width) {
      fitsHorizontally = false;
    }

    // console.log(fitsHorizontally)
    // console.log(coords)
    // console.log(screen)

    if (!fitsHorizontally) {
      if (side === 'right') {
        const offset = coords.width - parentCoords.width;
        this.tooltip.style.left = `-${offset}px`;
        this.tooltip.style.transform = 'unset';

        arrow.style.left = 'unset';
        arrow.style.transform = 'translateX(50%)';
        arrow.style.right = `${parentCoords.width/2}px`;
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