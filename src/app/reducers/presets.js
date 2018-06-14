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
        action.preset
      ];

    default:
      return state;
  }
}

export default presetsReducer;