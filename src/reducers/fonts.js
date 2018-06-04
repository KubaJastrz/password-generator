import { FONTS_LOADED } from '../actions/constants';

function fontsReducer(state = null, action) {
  switch (action.type) {
    case FONTS_LOADED:
      return {
        ...state,
        fontsLoaded: true
      };

    default:
      return state;
  }
}

export default fontsReducer;