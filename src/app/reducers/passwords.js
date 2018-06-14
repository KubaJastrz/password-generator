import {
  GENERATE_MAIN_PASSWORD,
  GENERATE_PASSWORD_LIST,
  SET_GENERATION_ERROR
} from '~/actions/constants';

function passwordsReducer(state = null, action) {
  switch (action.type) {
    case GENERATE_MAIN_PASSWORD:
      return {
        ...state,
        main: action.payload
      };

    case GENERATE_PASSWORD_LIST:
      return {
        ...state,
        list: action.payload
      };

    case SET_GENERATION_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

export default passwordsReducer;