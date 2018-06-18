import {
  ADD_PRESET,
  EDIT_PRESET,
  REMOVE_PRESET
} from '~/actions/constants';

function presetsReducer(state = null, action) {
  switch (action.type) {
    case ADD_PRESET:
      return [
        ...state,
        action.payload
      ];

    case EDIT_PRESET:
      return state;

    case REMOVE_PRESET:
      return state;

    default:
      return state;
  }
}

export default presetsReducer;