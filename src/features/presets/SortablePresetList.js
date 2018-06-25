import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import SortablePresetField from './SortablePresetField';

const PresetList = (props) => {
  const { fields, onFieldChange, onFieldRemove } = props;

  return (
    <div className="presets-list">
      {fields.map((field, index) => (
        <SortablePresetField
          key={field.id}
          index={index}
          id={field.id}
          name={field.name}
          onFieldChange={onFieldChange}
          onFieldRemove={onFieldRemove}
        />
      ))}
    </div>
  );
};

export default SortableContainer(PresetList);