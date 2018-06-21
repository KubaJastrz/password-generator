import LocalStorage from '~/app/LocalStorage';

// FONTS
const fonts = {
  fontsLoaded: false
};

// OPTIONS
const localOptions = LocalStorage.get('options', null);

const passwordOptions = {
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

const listOptions = {
  passwordCount: 3
};

const options = {
  activePreset: '0',
  unlimitedPasswordLength: false,
  password: passwordOptions,
  list: listOptions,
  ...localOptions
};

// LIST PRESETS
const localPresets = LocalStorage.get('presets', []);

const defaultPresets = [
  {
    id: '0',
    name: 'none',
    fields: []
  },
  {
    id: '1',
    name: 'example',
    fields: [
      { name: 'example 1', length: null },
      { name: 'example 2', length: 15 }
    ]
  }
];

const presets = defaultPresets;

const numberOfPresets = Math.max(localPresets.length, defaultPresets.length);

for (let i = 0; i < numberOfPresets; i++) {
  const local = localPresets[i];

  if (local != null) {
    presets[i] = local;
  }
}

// PASSWORDS
const passwords = {
  main: '',
  list: [],
  error: null
};

// TOOLTIPS
const tooltips = {
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
  fonts,
  options,
  passwords,
  presets,
  tooltips
};