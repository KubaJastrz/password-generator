import { combineReducers } from 'redux';

import optionsReducer from '../reducers/options';
import tooltipReducer from '../reducers/tooltip';
import fontsReducer from '../reducers/fonts';

export default combineReducers({
  options: optionsReducer,
  tooltips: tooltipReducer,
  fonts: fontsReducer
});