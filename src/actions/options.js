import {
  SET_OPTIONS_ERROR_TEXT,
  SET_OPTIONS_FIELDS
} from './constants';

export const setErrorMessage = (payload) => ({
  type: SET_OPTIONS_ERROR_TEXT,
  payload
});

export const setOptionsFields = (payload) => ({
  type: SET_OPTIONS_FIELDS,
  payload
});