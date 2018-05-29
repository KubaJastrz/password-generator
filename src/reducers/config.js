import LocalStorage from '../app/LocalStorage';

const localConfig = LocalStorage.get('config', null);

const defaultState = {
  allowCookies: false,
  unlimitedPasswordLength: false,
  ...localConfig
};

function configReducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default configReducer;