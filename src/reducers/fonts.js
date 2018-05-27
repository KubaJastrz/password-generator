const defaultState = {
  fontsLoaded: false
}

function fontsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'FONT_LOADED':
      return {
        ...state,
        fontsLoaded: true
      };

    default:
      return state;
  }
}

export default fontsReducer;