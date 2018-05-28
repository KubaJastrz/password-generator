import {
  SET_OPTIONS_ERROR_TEXT,
  SET_OPTIONS_FIELDS
} from '../actions/constants';

import { defaultOptions } from '../lib/generatePassword';
import LocalStorage from '../lib/LocalStorage';

// Options reducer

const localOptions = LocalStorage.get('options', null);
const includeChecked = LocalStorage.get('includeChecked', true);
const excludeChecked = LocalStorage.get('excludeChecked', true);

// if (includeChecked === false && localOptions !== null) {
//   console.log(true)
//   localOptions.include = '';
// }
// if (excludeChecked === false && localOptions !== null) {
//   localOptions.exclude = '';
// }

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