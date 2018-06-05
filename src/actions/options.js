import {
  SET_ACTIVE_PRESET,
  SET_OPTIONS_ERROR_TEXT,
  SET_OPTIONS_FIELDS
} from './constants';

export const setActivePreset = (payload) => ({
  type: SET_ACTIVE_PRESET,
  payload
});

export const setErrorMessage = (payload) => ({
  type: SET_OPTIONS_ERROR_TEXT,
  payload
});

export const setOptionsFields = (payload) => ({
  type: SET_OPTIONS_FIELDS,
  payload
});