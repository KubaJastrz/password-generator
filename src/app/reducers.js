import { combineReducers } from 'redux';

import optionsReducer from '../components/Options/reducer';

export default combineReducers({
  options: optionsReducer
});