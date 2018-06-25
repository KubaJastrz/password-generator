import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import DragHandler from './SortableHandler';
import IconButton from '~/common/IconButton';
import TextInput from '~/common/TextInput';

const PresetField = (props) => {
  const { id, name } = props;

  const onFieldRemove = () => {
    props.onFieldRemove(id);
  };

  const onFieldChange = (e, key) => {
    props.onFieldChange(e, id, key);
  };

  return (
    <div className="presets-field">
      <DragHandler />
      <TextInput
        value={name}
        onChange={e => onFieldChange(e, 'name')}
        className="in-modal name"
        placeholder="field name"
      />
      <TextInput
        value={length || ''}
        onChange={e => onFieldChange(e, 'length')}
        className="in-modal length"
        placeholder="field length"
      />
      <IconButton
        type="close"
        onClick={onFieldRemove}
        title="remove field"
        className="remove-button"
      />
    </div>
  );
};

export default SortableElement(PresetField);