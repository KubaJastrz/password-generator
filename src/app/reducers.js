import { combineReducers } from 'redux';

import optionsReducer from '../reducers/options';
import tooltipReducer from '../reducers/tooltip';

export default combineReducers({
  options: optionsReducer,
  tooltips: tooltipReducer
});