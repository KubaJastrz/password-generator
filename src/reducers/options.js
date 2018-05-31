import {
  SET_OPTIONS_ERROR_TEXT,
  SET_OPTIONS_FIELDS
} from '../actions/constants';

import { defaultOptions } from '../app/generatePassword';
import LocalStorage from '../app/LocalStorage';

const localOptions = LocalStorage.get('options', null);

const defaultState = {
  ...defaultOptions,
  ...localOptions
};

function optionsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_OPTIONS_ERROR_TEXT:
      return {
        ...state,
        errorMessage: action.payload
      };

    case SET_OPTIONS_FIELDS:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

export default optionsReducer;