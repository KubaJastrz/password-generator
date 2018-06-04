import {
  SET_OPTIONS_ERROR_TEXT,
  SET_OPTIONS_FIELDS
} from '../actions/constants';

function optionsReducer(state = null, action) {
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