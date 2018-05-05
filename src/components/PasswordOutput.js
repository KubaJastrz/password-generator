import React from 'react';
import PropTypes from 'prop-types';

import { selectText } from '../utils';

import CopyButton from './CopyButton';

class PasswordOutput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandButton: false,
      expanded: false
    };
    
    this.select = this.select.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  handleWindowResize(e) {
    this.handleButtonExpand();
  }

  handleButtonExpand() {
    const el = this.passRef;
    this.setState({ expanded: false });
    el.style.height = 'auto';
    const elHeight = el.offsetHeight;
    const rowHeight = 36; // 3.6rem
    const equal = elHeight === rowHeight;
    el.style.height = '3.6rem';

    if (!equal && !this.state.expandButton) {
      this.setState({
        expandButton: true
      }, () => {
        el.style.height = '3.6rem';
      });
    } else if (equal && this.state.expandButton) {
      this.setState({
        expandButton: false
      }, () => {
        el.style.height = 'auto';
      });
    }
  }

  toggleExpand() {
    console.log('toggleExpand()')
    this.setState(prevState => ({ expanded: !prevState.expanded }), () => {
      const height = '3.6rem';
      if (this.state.expanded) this.passRef.style.height = 'auto';
      else this.passRef.style.height = height;
    });
  }

  select() {
    selectText(this.passRef);
  }

  componentDidMount() {
    this.passRef.focus();
    // TODO: consider optimizing resize performance
    window.addEventListener('resize', (e) => {
      this.handleWindowResize(e);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.handleButtonExpand();
    }
  }

  render() {
    return (
      <div className="password-output">
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
            <button
              onClick={this.toggleExpand}
              onKeyDown={this.onKeyDown}
            >
              <svg className={this.state.expanded ? 'rotated' : ''} xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    ); 
  }
}

PasswordOutput.defaultProps = {
  copyButton: false
};

PasswordOutput.propTypes = {
  value: PropTypes.string.isRequired,
  copyButton: PropTypes.bool
};

export default PasswordOutput;