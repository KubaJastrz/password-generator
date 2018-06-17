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

    default:
      return state;
  }
}

export default presetsReducer;