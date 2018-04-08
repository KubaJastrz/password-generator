import { combineReducers } from 'redux';

import optionsReducer from '../containers/Options/reducer';

export default combineReducers({
  options: optionsReducer
});