import {
  SET_TOOLTIP_TEXT
} from '~/actions/constants';

function tooltipsReducer(state = null, action) {
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

export default tooltipsReducer;