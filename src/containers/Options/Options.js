import React from 'react';
import { connect } from 'react-redux';

import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import OptionsField from '../../components/OptionsField';

import { updateOptions } from './actions';

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.options,
      includeChecked: true
    };
  }

  onLengthChange(e) {
    const { value } = e.target;

    this.setState({
      length: value
    }, () => {
      if (!value || value.match(/^\d+$/)) {
        this.props.dispatch(updateOptions({
          ...this.state,
          length: this.state.length
        }));
      }
    });
  }

  onCheckboxChange(e, key) {
    const { checked } = e.target;

    this.setState((prevState) => {
      prevState[key] = checked;
      return prevState;
    }, () => {
      this.props.dispatch(updateOptions(this.state));
    });
  }

  onIncludeCheckboxChange(e) {
    const { checked } = e.target;

    this.setState((prevState) => ({
      includeChecked: !prevState.includeChecked
    }));
  }

  onIncludeTextChange(e) {
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
      <React.Fragment>
        <h3 className="options-title">Options:</h3>
        <div className="options-container">
          <OptionsField
            type="text"
            label="Password length"
            value={this.state.length}
            onTextChange={this.onLengthChange.bind(this)}
            textType="tel" // focus on numbers
          />
          <OptionsField
            type="checkbox"
            label="small letters"
            checked={this.state.small}
            onCheckboxChange={(e) => this.onCheckboxChange(e, 'small')}
          />
          <OptionsField
            type="checkbox"
            label="big letters"
            checked={this.state.big}
            onCheckboxChange={(e) => this.onCheckboxChange(e, 'big')}
          />
          <OptionsField
            type="checkbox"
            label="numbers"
            checked={this.state.numbers}
            onCheckboxChange={(e) => this.onCheckboxChange(e, 'numbers')}
          />
          <OptionsField
            type="checkbox"
            label="symbols"
            checked={this.state.symbols}
            onCheckboxChange={(e) => this.onCheckboxChange(e, 'symbols')}
          />
          <OptionsField
            type="checkbox"
            label="punctuation"
            checked={this.state.punctuation}
            onCheckboxChange={(e) => this.onCheckboxChange(e, 'punctuation')}
          />
          <OptionsField
            type="checkbox"
            label="exclude similiar"
            checked={this.state.similiar}
            onCheckboxChange={(e) => this.onCheckboxChange(e, 'similiar')}
          />
          <OptionsField
            type="checkbox"
            label="exclude duplicates"
            checked={this.state.duplicates}
            onCheckboxChange={(e) => this.onCheckboxChange(e, 'duplicates')}
          />
          <OptionsField
            type="checkbox-text"
            label="include characters"
            checked={this.state.includeChecked}
            onCheckboxChange={this.onIncludeCheckboxChange.bind(this)}
            value={this.state.include}
            onTextChange={this.onIncludeTextChange.bind(this)}
            textMonospaced={true}
            textDisabled={!this.state.includeChecked}
          />
          {this.props.options.errorMessage && (
            <p className="error-field">{this.props.options.errorMessage}</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  options: state.options
});

export default connect(mapState)(Options);