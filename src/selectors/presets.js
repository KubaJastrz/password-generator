export function getPresetFields(presets, name) {
  const preset = presets.find(preset => {
    return preset.name === name;
  });

  if (preset && preset.fields) return preset.fields;

  return [];
}

export function getPresetNames(presets) {
  return presets.reduce((acc, cur) => {
    return acc.concat(cur.name);
  }, ['create-new']); // temporary value used for opening modal
}