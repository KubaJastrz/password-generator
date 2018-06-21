function getPresetById(presets, id) {
  return presets.find(preset => {
    return preset.id === id;
  });
}

export function getPresetFields(presets, id) {
  const preset = getPresetById(presets, id);

  if (preset && preset.fields) return preset.fields;

  return [];
}

export function getPresetName(presets, id) {
  const preset = getPresetById(presets, id);

  if (preset && preset.name) return preset.name;

  return null;
}

export function getPresetsNames(presets) {
  return presets.reduce((acc, cur) => {
    return acc.concat(cur.name);
  }, []);
}