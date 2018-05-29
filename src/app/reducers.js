import { combineReducers } from 'redux';

import configReducer from '../reducers/config';
import optionsReducer from '../reducers/options';
import tooltipReducer from '../reducers/tooltip';
import fontsReducer from '../reducers/fonts';

export default combineReducers({
  config: configReducer,
  options: optionsReducer,
  tooltips: tooltipReducer,
  fonts: fontsReducer
});