import {
  SET_TOOLTIP_TEXT
} from '../actions/constants';

const defaultState = {
  length: { show: false, text: '' },
  small: { show: false, text: '' },
  big: { show: false, text: '' },
  numbers: { show: false, text: '' },
  symbols: { show: false, text: '' },
  punctuation: { show: false, text: '' }
};

function tooltipReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TOOLTIP_TEXT:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

export default tooltipReducer;