import React from 'react';
import { connect } from 'react-redux';

import Checkbox from './components/Checkbox';
import Input from './components/Input';

import { updateOptions } from './actions';

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.options
    }
  }

  onLengthChange(e) {
    const { value } = e.target;

    this.setState({
      length: value
    }, () => {
      if (!value || value.match(/^\d+$/)) {
        this.props.dispatch(updateOptions({
          ...this.state,
          length: Number(this.state.length)
        }));
      }
    });
  }

  handleCheckboxChange(e, key) {
    const { checked } = e.target;

    this.setState((prevState) => {
      prevState[key] = checked;
      return prevState;
    }, () => {
      this.props.dispatch(updateOptions(this.state))
    });
  }

  onIncludeInputChange(e) {
    const { value } = e.target;

    this.setState((prevState) => {
      prevState.include = value;
      return prevState;
    }, () => {
      this.props.dispatch(updateOptions(this.state));
    });
  }

  render() {
    return (
      <div className="options-container">
        <p>options</p>
        <Input
          label="length"
          value={this.state.length}
          onChange={this.onLengthChange.bind(this)}
        />
        <Checkbox
          label="small letters"
          checked={this.state.small}
          onChange={(e) => this.handleCheckboxChange(e, 'small')}
        />
        <Checkbox
          label="big letters"
          checked={this.state.big}
          onChange={(e) => this.handleCheckboxChange(e, 'big')}
        />
        <Checkbox
          label="numbers"
          checked={this.state.numbers}
          onChange={(e) => this.handleCheckboxChange(e, 'numbers')}
        />
        <Checkbox
          label="symbols"
          checked={this.state.symbols}
          onChange={(e) => this.handleCheckboxChange(e, 'symbols')}
        />
        <Checkbox
          label="punctuation"
          checked={this.state.punctuation}
          onChange={(e) => this.handleCheckboxChange(e, 'punctuation')}
        />
        <Checkbox
          label="exclude similiar"
          checked={this.state.similiar}
          onChange={(e) => this.handleCheckboxChange(e, 'similiar')}
        />
        <Checkbox
          label="exclude duplicates"
          checked={this.state.duplicates}
          onChange={(e) => this.handleCheckboxChange(e, 'duplicates')}
        />
        <Input
          label="include"
          value={this.state.include}
          onChange={(e) => this.onIncludeInputChange(e)}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  options: state.options
});

export default connect(mapState)(Options);