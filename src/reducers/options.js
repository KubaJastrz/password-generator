import {
  SET_ACTIVE_PRESET,
  SET_UNLIMITED_PASSWORD_LENGTH,
  SET_LIST_OPTION,
  SET_PASSWORD_OPTION
} from '../actions/constants';

function optionsReducer(state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_PRESET:
      return {
        ...state,
        activePreset: action.payload
      };

    case SET_UNLIMITED_PASSWORD_LENGTH:
      return {
        ...state,
        unlimitedPasswordLength: action.payload
      };

    case SET_LIST_OPTION:
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload
        }
      };

    case SET_PASSWORD_OPTION:
      return {
        ...state,
        password: {
          ...state.password,
          ...action.payload
        }
      };

    default:
      return state;
  }
}

export default optionsReducer;