import {
  ADD_PRESET,
  EDIT_PRESET,
  REMOVE_PRESET
} from './constants';

import uuid from 'uuid/v4';

export const addPreset = (options) => ({
  type: ADD_PRESET,
  preset: {
    id: uuid(),
    options
  }
});