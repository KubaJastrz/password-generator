import {
  ADD_PRESET,
  EDIT_PRESET,
  REMOVE_PRESET
} from './constants';

export const addPreset = (payload) => ({
  type: ADD_PRESET,
  payload: {
    ...payload
  }
});

export const editPreset = (name) => ({
  type: EDIT_PRESET,
  payload: {
    // ...payload
  }
});

export const removePreset = (name) => ({
  type: REMOVE_PRESET,
  payload: {
    // ...payload
  }
});