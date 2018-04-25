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
      options: this.props.options,
      includeChecked: true
    };

    this.onLengthChange = this.onLengthChange.bind(this);
    this.onIncludeCheckboxChange = this.onIncludeCheckboxChange.bind(this);
    this.onIncludeTextChange = this.onIncludeTextChange.bind(this);
  }

  onLengthChange(e) {
    const { value } = e.target;

    this.setState({
      length: value
    }, () => {
      if (!value || value.match(/^\d+$/)) {
        this.updateOptions();
      }
    });
  }

  onCheckboxChange(e, key) {
    const { checked } = e.target;

    this.setState((prevState) => {
      prevState.options[key] = checked;
      return prevState;
    }, this.updateOptions);
  }

  onIncludeCheckboxChange() {
    this.setState((prevState) => ({
      includeChecked: !prevState.includeChecked
    }), this.updateOptions);
  }

  onIncludeTextChange(e) {
    const { value } = e.target;

    this.setState((prevState) => {
      prevState.options.include = value;
      return prevState;
    }, this.updateOptions);
  }

  updateOptions() {
    let options = { ...this.state.options };
    if (!this.state.includeChecked) {
      options.include = '';
    }
    this.props.dispatch(updateOptions(options));
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="options-title">Options:</h3>
        <div className="options-wrapper">
          <div className="options-container">
            <OptionsField
              type="text"
              label="Password length"
              value={this.state.options.length}
              onTextChange={this.onLengthChange}
              textType="tel" // focus on numbers
              id="options-length"
            />
            <OptionsField
              type="checkbox"
              label="small letters"
              checked={this.state.options.small}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'small')}
            />
            <OptionsField
              type="checkbox"
              label="big letters"
              checked={this.state.options.big}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'big')}
            />
            <OptionsField
              type="checkbox"
              label="numbers"
              checked={this.state.options.numbers}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'numbers')}
            />
            <OptionsField
              type="checkbox"
              label="symbols"
              checked={this.state.options.symbols}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'symbols')}
            />
            <OptionsField
              type="checkbox"
              label="punctuation"
              checked={this.state.options.punctuation}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'punctuation')}
            />
            <OptionsField
              type="checkbox"
              label="exclude similiar"
              checked={this.state.options.similiar}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'similiar')}
            />
            <OptionsField
              type="checkbox"
              label="exclude duplicates"
              checked={this.state.options.duplicates}
              onCheckboxChange={(e) => this.onCheckboxChange(e, 'duplicates')}
            />
            <OptionsField
              type="checkbox-text"
              label="include characters"
              checked={this.state.includeChecked}
              onCheckboxChange={this.onIncludeCheckboxChange}
              value={this.state.options.include}
              onTextChange={this.onIncludeTextChange}
              textMonospaced={true}
              textDisabled={!this.state.includeChecked}
            />
          </div>
          <div className="options-container">
            <h3>More features coming soon!</h3>
          </div>
        </div>
        {this.props.options.errorMessage && (
          <p className="error-field">{this.props.options.errorMessage}</p>
        )}
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  options: state.options
});

export default connect(mapState)(Options);