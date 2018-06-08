import {
  SET_ACTIVE_PRESET,
  SET_UNLIMITED_PASSWORD_LENGTH,
  SET_LIST_OPTION,
  SET_PASSWORD_OPTION
} from './constants';

export const setActivePreset = (payload) => ({
  type: SET_ACTIVE_PRESET,
  payload
});

export const setUnlimitedPasswordLength = (payload) => ({
  type: SET_UNLIMITED_PASSWORD_LENGTH,
  payload
});

export const setListOption = (payload) => ({
  type: SET_LIST_OPTION,
  payload
});

export const setPasswordOption = (payload) => ({
  type: SET_PASSWORD_OPTION,
  payload
});