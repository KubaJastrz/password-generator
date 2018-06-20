import {
  ADD_PRESET,
  EDIT_PRESET,
  REMOVE_PRESET
} from './constants';

export const addPreset = (preset) => ({
  type: ADD_PRESET,
  payload: {
    ...preset
  }
});

export const editPreset = (preset) => ({
  type: EDIT_PRESET,
  payload: {
    ...preset
  }
});

export const removePreset = (id) => ({
  type: REMOVE_PRESET,
  payload: {
    id
  }
});