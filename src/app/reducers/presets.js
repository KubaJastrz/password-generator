import {
  ADD_PRESET,
  EDIT_PRESET,
  REMOVE_PRESET
} from '~/actions/constants';

function presetsReducer(state = null, { type, payload }) {
  switch (type) {
    case ADD_PRESET:
      return [
        ...state,
        payload
      ];

    case EDIT_PRESET:
      return state.map(preset => {
        if (preset.id === payload.id) {
          return payload;
        }

        return preset;
      });

    case REMOVE_PRESET:
      return state;

    default:
      return state;
  }
}

export default presetsReducer;