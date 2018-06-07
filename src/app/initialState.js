import LocalStorage from './LocalStorage';

// APP CONFIG
const localConfig = LocalStorage.get('config', null);
export const config = {
  unlimitedPasswordLength: false,
  ...localConfig
};

// FONTS
export const fonts = {
  fontsLoaded: false
};

// OPTIONS
const localOptions = LocalStorage.get('options', null);

export const passwordOptions = {
  length: 8,
  small: { use: true, min: 1 },
  big: { use: true, min: 1 },
  numbers: { use: true, min: 1 },
  symbols: { use: true, min: 1 },
  punctuation: { use: false, min: 1 },
  similar: true,
  duplicates: true,
  include: { use: true, value: '' },
  exclude: { use: true, value: '' }
};

export const options = {
  ...passwordOptions,
  activePreset: 'none',
  passwordCount: 3,
  ...localOptions
};

// OPTIONS PRESETS
export const presets = [
  { id: '0', name: 'none' }
];

// PASSWORDS
export const passwords = {
  main: '',
  list: []
};

// TOOLTIPS
export const tooltips = {
  length: { show: false, text: '' },
  small: { show: false, text: '' },
  big: { show: false, text: '' },
  numbers: { show: false, text: '' },
  symbols: { show: false, text: '' },
  punctuation: { show: false, text: '' },
  passwordCount: { show: false, text: '' }
};

// EXPORTS
export default {
  config,
  fonts,
  options,
  passwords,
  presets,
  tooltips
};