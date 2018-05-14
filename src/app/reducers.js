import { combineReducers } from 'redux';

import optionsReducer from '../reducers/options';

export default combineReducers({
  options: optionsReducer
});