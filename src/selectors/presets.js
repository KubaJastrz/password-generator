export function getPresetFields(presets, name) {
  return presets.find(preset => {
    return preset.name === name;
  }).fields;
}