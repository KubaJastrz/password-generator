import React from 'react';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';

import DragHandler from './SortableHandler';
import IconButton from '~/common/IconButton';
import TextInput from '~/common/TextInput';

const PresetField = (props) => {
  const { id, length, name, options } = props;

  const onFieldRemove = () => {
    props.onFieldRemove(id);
  };

  const onFieldChange = (e, key) => {
    props.onFieldChange(e, id, key);
  };

  return (
    <div className="presets-field">
      <DragHandler />
      <label className="text-input-group name">
        Name
        <TextInput
          value={name}
          onChange={e => onFieldChange(e, 'name')}
        />
      </label>

      <label className="text-input-group length">
        Length
        <TextInput
          value={length || ''}
          onChange={e => onFieldChange(e, 'length')}
          placeholder={options.password.length}
        />
      </label>

      <IconButton
        type="close"
        onClick={onFieldRemove}
        title="remove field"
        className="remove-button"
      />
    </div>
  );
};

const mapState = (state) => ({
  options: state.options
});

export default SortableElement( connect(mapState)(PresetField) );