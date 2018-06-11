import React from 'react';
import { connect } from 'react-redux';

import Modal from './Modal';
import Button from '../Button';
import Checkbox from '../Checkbox';
import IconButton from '../IconButton';
import Select from '../Select';
import TextInput from '../TextInput';

import { createCSVData } from '../../utils/app';

class DownloadButton extends React.PureComponent {
  state = {
    name: 'password-list',
    extension: 'txt',
    filePreview: '',
    includeHeader: false,
    includeNameColumn: true,
    header: '',
    delimiter: ','
  }

  createFileData(object) {
    if (!this.state.includeNameColumn) {
      return object.map(row => [row.value]);
    }

    return object.map(row => [row.name, row.value]);
  }

  onNameChange = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  }

  onExtensionChange = (e) => {
    const { value } = e.target;
    this.setState({ extension: value });
  }

  prepareFileData = () => {
    const { list } = this.props.passwords;
    const fileData = this.createFileData(list);
    const {
      header,
      delimiter,
      includeHeader,
      includeNameColumn
    } = this.state;
    let finalHeader = '';

    if (includeHeader) {
      if (header.length > 0) {
        finalHeader = header;
      } else {
        finalHeader = this.getHeader();
      }
    } else {
      finalHeader = null;
    }

    return createCSVData(fileData, finalHeader, delimiter);
  }

  onFileDownload = () => {
    const { name, extension } = this.state;
    const filename = `${name || 'download'}.${extension}`;
    const textType = extension === 'csv' ? 'text/csv' : 'text/plain';

    const data = this.prepareFileData();
    const blob = new Blob([data], {
      type: `data:text/${textType};charset=utf-8;`
    });

    const link = document.createElement('a');
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else if (URL && 'download' in link) {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  updateFilePreview = () => {
    const data = this.prepareFileData();
    this.setState({ filePreview: data });
  }

  afterModalOpen = () => {
    this.updateFilePreview();
  }

  onCheckboxChange = (e, key) => {
    const { checked } = e.target;
    this.setState({ [key]: checked }, this.updateFilePreview);
  }

  onDelimiterChange = (e) => {
    const { value } = e.target;
    this.setState({ delimiter: value }, this.updateFilePreview);
  }

  onHeaderChange = (e) => {
    const { value } = e.target;
    this.setState({ header: value }, this.updateFilePreview);
  }

  getHeader = () => {
    const { delimiter: d, includeNameColumn } = this.state;
    return includeNameColumn ? `Name${d}Password` : 'Password';
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterModalOpen}
        onRequestClose={this.props.onRequestClose}
        contentLabel="Download file"
        className="download-modal"
      >
        <h2 className="modal-title">Download list as file</h2>

        <div className="filename-group">
          <TextInput
            value={this.state.name}
            onChange={this.onNameChange}
            className="in-modal"
            placeholder="download"
          />
          
          <Select
            value={this.state.extension}
            onChange={this.onExtensionChange}
          >
            <option value="txt">.txt</option>
            <option value="csv">.csv</option>
          </Select>
          
          <Button onClick={this.onFileDownload}>download</Button>
        </div>

        <div className="file-options">
          <div className="file-options-row radio-group">
            <span>delimiter:</span>
            <div className="radio-group-row">
              <label>
                <input
                  type="radio"
                  value=","
                  checked={this.state.delimiter === ','}
                  onChange={this.onDelimiterChange}
                />
                <span>comma</span>
              </label>
            </div>
            <div className="radio-group-row">
              <label>
                <input
                  type="radio"
                  value=";"
                  checked={this.state.delimiter === ';'}
                  onChange={this.onDelimiterChange}
                />
                <span>semicolon</span>
              </label>
            </div>
            <div className="radio-group-row">
              <label>
                <input
                  type="radio"
                  value=" "
                  checked={this.state.delimiter === ' '}
                  onChange={this.onDelimiterChange}
                />
                <span>space</span>
              </label>
            </div>
          </div>

          <div className="file-options-row">
            <label>
              <Checkbox
                checked={this.state.includeNameColumn}
                onChange={e => this.onCheckboxChange(e, 'includeNameColumn')}
                type="material"
              />
              <span>include name column</span>
            </label>
          </div>

          <div className="file-options-row">
            <label>
              <Checkbox
                checked={this.state.includeHeader}
                onChange={e => this.onCheckboxChange(e, 'includeHeader')}
                type="material"
              />
              <span>include header:</span>
            </label>
            <TextInput
              value={this.state.header}
              onChange={this.onHeaderChange}
              className="in-modal monospace"
              placeholder={this.getHeader()}
            />
          </div>
        </div>

        <div className="file-preview">
          <h3>File preview</h3>
          <pre>{this.state.filePreview}</pre>
        </div>
      </Modal>
    );
  }
}

const mapState = (state) => ({
  passwords: state.passwords
});

export default connect(mapState)(DownloadButton);