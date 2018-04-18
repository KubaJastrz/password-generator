import React from 'react';
import PropTypes from 'prop-types';

import { selectText } from '../../utils';

import CopyButton from '../CopyButton';

// TODO: make whole password visible (textarea + button)

class PasswordOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandButton: false,
      expanded: false
    };
  }

  handleButtonExpand() {
    const el = this.passRef;
    const elHeight = el.offsetHeight;
    const rowHeight = 36; // 3.6rem
    const equal = elHeight === rowHeight;

    if (!equal && !this.state.expandButton) {
      this.setState({
        expandButton: true
      }, () => {
        el.style.height = '3.6rem';
      });
    }
  }

  toggleExpand() {
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
  }

  componentDidUpdate() {
    this.handleButtonExpand();
  }

  onKeyDown(e) {
    if (e.code === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className="password-output">
        <div
          ref={ref => this.passRef = ref}
          onClick={this.select.bind(this)}
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
              onClick={this.toggleExpand.bind(this)}
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