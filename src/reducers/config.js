import {
  SET_CONFIG_UNLIMITED_LENGTH
} from '../actions/constants';

import LocalStorage from '../app/LocalStorage';

function configReducer(state = null, action) {
  let newState;

  switch (action.type) {
    case SET_CONFIG_UNLIMITED_LENGTH:
      newState = {
        ...state,
        unlimitedPasswordLength: action.payload
      };

      LocalStorage.set('config', newState);
      return newState;

    default:
      return state;
  }
}

export default configReducer;