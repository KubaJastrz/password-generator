import { defaultOptions } from '../../lib/generatePassword';
import LocalStorage from '../../lib/LocalStorage';

// Options reducer

const localOptions = LocalStorage.get('options');

const defaultState = {
  ...defaultOptions,
  ...localOptions
};

console.log(defaultState)

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_OPTIONS':
      return {
        ...state,
        ...action.payload
      };

    case 'SET_OPTIONS_ERROR':
      return {
        ...state,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};