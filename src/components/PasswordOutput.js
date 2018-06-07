import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CopyButton from './CopyButton';
import Icon from './Icon';
import IconButton from './IconButton';
import { selectText } from '../utils/dom';

class PasswordOutput extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    variant: PropTypes.string,
    focusOnMount: PropTypes.bool,
    copyButton: PropTypes.bool,
    expandButton: PropTypes.bool,
    fontsLoaded: PropTypes.bool
  }

  static defaultProps = {
    copyButton: false
  }
  
  state = {
    expandButton: false,
    expanded: false
  }

  handleWindowResize = (e) => {
    this.handleButtonExpand();
  }

  handleButtonExpand = () => {
    if (!this.props.expandButton) {
      return;
    }
    
    const el = this.passRef;
    this.setState({ expanded: false });
    el.style.height = 'auto';
    const elHeight = el.offsetHeight;
    const rowHeight = 36; // 3.6rem
    const equal = elHeight === rowHeight;
    el.style.height = '3.6rem';

    // password doesn't fit on screen
    if (!equal && !this.state.expandButton) {
      this.setState({
        expandButton: true
      }, () => {
        el.style.height = '3.6rem';
      });
    }
    // password fits on screen
    else if (equal && this.state.expandButton) {
      this.setState({
        expandButton: false
      }, () => {
        el.style.height = 'auto';
      });
    }
  }

  toggleExpand = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }), () => {
      const height = '3.6rem';
      if (this.state.expanded) this.passRef.style.height = 'auto';
      else this.passRef.style.height = height;
    });
  }

  select = () => {
    selectText(this.passRef);
  }

  componentDidMount() {
    if (this.props.focusOnMount) {
      this.passRef.focus();
    }

    // TODO: consider optimizing resize performance
    if (this.props.expandButton) {
      window.addEventListener('resize', this.handleWindowResize);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value) {
      this.handleButtonExpand();
    }
    if (this.props.fontsLoaded === true &&
      this.props.fontsLoaded !== prevProps.fontsLoaded) {
      this.handleButtonExpand();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    const className = classNames('password-output', this.props.variant);

    return (
      <div className={className}>
        <div
          ref={ref => this.passRef = ref}
          onClick={this.select}
          className="output-field"
          tabIndex="0"
        >
          {this.props.value}
        </div>
        
        <div className="output-buttons">
          {this.props.copyButton && (
            <CopyButton copyRef={this.passRef} />
          )}
          {this.props.expandButton && this.state.expandButton && (
            <IconButton onClick={this.toggleExpand}>
              <Icon type="chevron-down" className={this.state.expanded ? 'rotated' : ''} />
            </IconButton>
          )}
        </div>
      </div>
    ); 
  }
}

export default PasswordOutput;