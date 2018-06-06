import LocalStorage from './LocalStorage';

const localConfig = LocalStorage.get('config', null);
export const config = {
  unlimitedPasswordLength: false,
  ...localConfig
};

export const fonts = {
  fontsLoaded: false
};

const localOptions = LocalStorage.get('options', null);
export const options = {
  length: 8,
  small: { checked: true, min: 1 },
  big: { checked: true, min: 1 },
  numbers: { checked: true, min: 1 },
  symbols: { checked: true, min: 1 },
  punctuation: { checked: false, min: 1 },
  similar: true,
  duplicates: true,
  include: '',
  includeChecked: true,
  exclude: '',
  excludeChecked: true,
  preset: null,
  ...localOptions
};

export const presets = [
  { id: '0', name: 'none' }
];

export const tooltips = {
  length: { show: false, text: '' },
  small: { show: false, text: '' },
  big: { show: false, text: '' },
  numbers: { show: false, text: '' },
  symbols: { show: false, text: '' },
  punctuation: { show: false, text: '' }
};

export default {
  config,
  fonts,
  options,
  presets,
  tooltips
};