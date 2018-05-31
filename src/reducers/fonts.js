import { FONTS_LOADED } from '../actions/constants';

const defaultState = {
  fontsLoaded: false
};

function fontsReducer(state = defaultState, action) {
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