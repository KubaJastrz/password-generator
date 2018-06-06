import {
  ADD_PRESET,
  EDIT_PRESET,
  REMOVE_PRESET
} from './constants';

import uuid from 'uuid/v4';

export const addPreset = (payload) => ({
  type: ADD_PRESET,
  preset: {
    id: uuid(),
    ...payload
  }
});