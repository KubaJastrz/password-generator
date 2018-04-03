import { defaultOptions } from '../Password/generatePassword';

// Options reducer

const defaultState = {
  options: defaultOptions
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_OPTIONS':
      return {
        ...state,
        options: action.payload
      };

    case 'OPTIONS_ERROR':
      console.error(action.payload)
      return state;

    default:
      return state;
  }
};