import { defaultOptions } from '../../lib/generatePassword';

// Options reducer

const defaultState = {
  ...defaultOptions
};

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